import { OrderService, CheckoutService } from '@services';
import { PermissionUtils } from '@utils';
import BaseController from './base';

export default class OrderController extends BaseController {
	constructor() {
		super();

		this.orderService = new OrderService();
		this.checkoutService = new CheckoutService();

		this.bindActions(['store', 'list', 'destroy', 'update']);
	}

	async store(req, res) {
		try {
			const order = await this.checkoutService.store({
				...req.data,
				...req.auth,
				store_id: req.params.company_id
			});

			this.successHandler(order, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async update(req, res) {
		await PermissionUtils.verifyRootPermission(req.auth);

		try {
			const order = await this.orderService.updateOrder({
				...req.params,
				...req.data
			});

			this.successHandler(order, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async destroy(req, res) {
		try {
			await PermissionUtils.verifyManagerPermission(req.auth);

			const order = await this.orderService.destroy({
				...req.auth,
				id: req.params.id
			});

			this.successHandler(order, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async list(req, res) {
		try {
			await PermissionUtils.verifyManagerPermission(req.auth);

			if (req.auth.user_role === 'CUSTOMER') {
				const orders = await this.orderService.listUserOrders({id: req.auth.user_id});

				this.successHandler(orders, res);
				return;
			}

			if (req.auth.is_root) {
				const orders = await this.orderService.listAllOrders();

				this.successHandler(orders, res);
				return;
			}


			const orders = await this.orderService.listOrdersbyCompany({ id: req.auth.company_id });

			this.successHandler(orders, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}
}
