import { Company, Checkout, User, Order, Inventory, Category } from '@models';

export default class BaseService {
	async findCompany(companyId) {
		return await Company.findOne({
            where: { id: companyId },
			attributes: ['id', 'name', 'address', 'creator_id']
        });
	}

	async findCategory(categoryId) {
		return await Category.findOne({
            where: { id: categoryId }
        });
	}

	async findCheckout(checkoutId) {
		return await Checkout.findOne({
            where: { id: checkoutId }
        });
	}

	async findUser(userId) {
		return await User.findOne({
            where: { id: userId }
        });
	}

	async findOrder(orderId) {
		return await Order.findOne({
            where: { id: orderId }
        });
	}

	async findInventory(inventoryId) {
		return await Inventory.findOne({
            where: { id: inventoryId }
        });
	}
}
