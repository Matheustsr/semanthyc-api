import { Checkout, User, Inventory, Order } from '@models';
import { ExceptionUtils } from '@utils';
import BaseService from './base';

import pLimit from 'p-limit';
import moment from 'moment';
import { toInteger } from 'lodash';

export default class CheckoutService extends BaseService {
	async checkoutOperation(checkoutData) {
		const userInfo = await this.findUser(checkoutData.user_id);
		let totalValue = 0;

		const concurrenceLimit = pLimit(5);
		const concurrenceLimitPromises = checkoutData.items.map(cartItem => {
			return concurrenceLimit(async () => {
				const inventoryItem = await this.findInventory(cartItem.id);

				if (!inventoryItem) {
					throw new ExceptionUtils(`${cartItem.id}_NOT_FOUND`);
				} else if (toInteger(checkoutData.store_id) !== inventoryItem.company_id) {
					throw new ExceptionUtils(`${cartItem.id}_ITEM_NOT_BELONG_TO_STORE`);
				} else if (inventoryItem.amout_available <= 0){
					throw new ExceptionUtils(`${cartItem.id}_IS_OUT_OF_STOCK`);
				}

				totalValue += inventoryItem.value * cartItem.quantity;

				console.log(`total da compra: ${totalValue}`);

				if (userInfo.balance <= totalValue) {
					throw new ExceptionUtils('INSUFFICIENT_FUNDS');
				}

				const userChanges = {
					changes: {
						balance: (userInfo.balance - totalValue)
					},
					where: {
						id: checkoutData.user_id
					}
				};
				const inventoryChanges = {
					changes: {
						amout_available: (inventoryItem.amout_available -= cartItem.quantity),
						units_sold: (inventoryItem.units_sold += cartItem.quantity)
					},
					where: {
						id: cartItem.id
					}
				};

				return { inventory: inventoryChanges, user: userChanges};
			});
		});

		const itemsToProcess = await Promise.all(concurrenceLimitPromises);

		await this.updateUser(itemsToProcess);
		await this.updateInventory(itemsToProcess);
	}

	async updateInventory(items) {
		const transaction = await Inventory.sequelize.transaction();

		try {
			const promises = items.map(item => {
				return Inventory.update(item.inventory.changes, {
					where: item.inventory.where,
					transaction
				});
			});

			await Promise.all(promises);
			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}

	async updateUser(items) {
		const transaction = await Inventory.sequelize.transaction();

		try {
			const promises = items.map(item => {
				return User.update(item.user.changes, {
					where: item.user.where,
					transaction
				});
			});

			await Promise.all(promises);
			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}

	async mountOrderData(data, checkoutId) {
		const orderData = {
			sale_date: moment().format('YYYY-MM-DD HH:mm:ss'),
			items: data.items,
			checkout_id: checkoutId,
			company_id: data.company_id,
			user_id: data.user_id
		};

		return orderData;
	}

	async mountCheckoutData(data) {
		const checkoutData = {
			status: 'SOLD',
			user_id: data.user_id,
			company_id: data.company_id,
			items: data.items
		};

		return checkoutData;
	}

	async store(operationData) {
		await this.checkoutOperation(operationData);

		const checkoutData = await this.mountCheckoutData(operationData);
        const checkout = await Checkout.create(checkoutData);

		const orderData = await this.mountOrderData(operationData, checkout.id);
		const order = await Order.create(orderData);

		return order;
	}

	listAllCheckouts() {
		return Checkout.findAll();
	}

	listCheckoutsByCompany(companyId) {
		return Checkout.findAll({ where: { company_id: companyId } });
	}

	async update(checkoutData) {
		const checkoutExists = await this.findCheckout(checkoutData.id)

        if (!checkoutExists) {
			throw new ExceptionUtils('INVALID_CHECKOUT');
        } else if (checkoutData.company_id !== checkoutExists.company_id && !checkoutData.is_root) {
			throw new ExceptionUtils('UNAUTHORIZED_ACTION');
		}

        return await Checkout.update(checkoutData, {
			where: {
				id: checkoutData.id
			}
		});
	}

	async destroy(checkoutData) {
		const checkoutExists = await this.findCheckout(checkoutData.id)

        if (!checkoutExists) {
			throw new ExceptionUtils('INVALID_CHECKOUT');
        } else if ( checkoutExists.status === 'SOLD') {
			throw new ExceptionUtils('FINISHED_CHECKOUT');
		} else if (checkoutData.company_id !== checkoutExists.company_id && !checkoutData.is_root) {
			throw new ExceptionUtils('UNAUTHORIZED_ACTION');
		}

        await Checkout.destroy({ where: { id: checkoutData.id } });
	}
}
