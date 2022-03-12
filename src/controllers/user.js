import { UserService } from '@services';
import { PermissionUtils } from '@utils';
import BaseController from './base';

export default class UserController extends BaseController {
	constructor() {
		super();

		this.userService = new UserService();

		this.bindActions(['store', 'listUsers', 'update', 'updateRole']);
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
