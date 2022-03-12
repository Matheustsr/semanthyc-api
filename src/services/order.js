import { ExceptionUtils } from '@utils';
import { Order } from '@models';
import BaseService from './base';

export default class OrderService extends BaseService {
	listAllOrders() {
		return Order.findAll();
	}

	listUserOrders(userId) {
		return Order.findAll({where: { user_id: userId }});
	}

	listOrdersbyCompany(company) {
		return Order.findAll({ where: { company_id: company.id } });
	}

	async destroy(orderData) {
		const orderInfo = await this.findOrder(orderData.id)

        if (!orderInfo) {
			throw new ExceptionUtils('INVALID_ORDER');
        } else if (orderInfo.user_id !== orderData.user_id && !orderData.is_root) {
			throw new ExceptionUtils('UNAUTHORIZED_ACTION');
		} else if (orderInfo.status !== 'PENDING') {
			throw new ExceptionUtils('ORDER_FINISHED');
		}

        await Order.destroy({ where: { id: orderData.id } });
	}

	async updateOrder(data) {
		const orderExists = await this.findOrder(data.id)

        if (!orderExists) {
			throw new ExceptionUtils('INVALID_DEPARTMENT');
        }

		await Order.update(data, { where: { id: data.id } });
	}

}
