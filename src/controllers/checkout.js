import { CheckoutService } from '@services';
import { PermissionUtils } from '@utils';
import BaseController from './base';

export default class CheckoutController extends BaseController {
	constructor() {
		super();

		this.checkoutService = new CheckoutService();

		this.bindActions(['list', 'update', 'destroy']);
	}

	async list(req, res) {
		try {
			await PermissionUtils.verifyManagerPermission(req.auth);

			if (req.auth.is_root) {
				const checkouts = await this.checkoutService.listAllCheckouts();

				this.successHandler(checkouts, res);
				return;
			}

			const checkouts = await this.checkoutService.listCheckoutsByCompany(req.auth.company_id);

			this.successHandler(checkouts, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async update(req, res) {
		try {
			await PermissionUtils.verifyRootPermission(req.auth);

			const checkout = await this.checkoutService.update({
				id: req.params.id,
				...req.data,
				...req.auth
			});

			this.successHandler(checkout, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async destroy(req, res) {
		try {
			const checkout = await this.checkoutService.destroy({
				id: req.params.id,
				...req.auth
			});

			this.successHandler(checkout, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}
}
