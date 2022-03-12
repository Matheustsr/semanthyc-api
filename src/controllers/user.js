import { PermissionUtils } from '@utils';
import { UserService } from '@services';
import BaseController from './base';
import { Op } from 'sequelize';

export default class UserController extends BaseController {
	constructor() {
		super();

		this.userService = new UserService();

		this.bindActions(['store', 'destroy', 'listUsers', 'update', 'updateRole', 'reportByGreaterExpense']);
	}

	async store(req, res) {
		try {
			await PermissionUtils.verifyRegisterPermissions(req);

			const user = await this.userService.store({
				...req.data,
				id: req.auth.id
			});

			this.successHandler(user, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async listUsers(req, res) {
		try {
			await PermissionUtils.verifyManagerPermission(req.auth);

			if (req.auth.is_root) {
				const users = await this.userService.listAllUsers();

				this.successHandler(users, res);
				return;
			}

			const user = await this.userService.listUsersByCompany(req.auth.company_id);

			this.successHandler(user, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async destroy(req, res) {
		try {
			await PermissionUtils.verifyManagerPermission(req.auth);

			const user = await this.userService.destroy({
				...req.auth,
				id: req.params.user_id
			});

			this.successHandler(user, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async update(req, res) {
		try {
			await PermissionUtils.verifyManagerPermission(req.auth);

			const user = await this.userService.updateUser({
				...req.params,
				...req.data
			});

			this.successHandler(user, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async reportByGreaterExpense(req, res) {
		try {
			await PermissionUtils.verifyRootPermission(req.auth);

			const filter = {};

			if (req.data.start_date) {
				filter.sale_date = {
					[Op.gte]: req.data.start_date
				}
			}

			if (req.data.end_date) {
				filter.sale_date = {
					[Op.lte]: req.data.end_date
				}
			}

			const user = await this.userService.findUsersByGreaterExpense(filter);

			this.successHandler(user, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async updateRole(req, res) {
		try {
			await PermissionUtils.verifyRootPermission(req.auth);

			const user = await this.userService.updateRole({
				...req.params,
				user_role: req.data.user_type
			});

			this.successHandler(user, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}
}
