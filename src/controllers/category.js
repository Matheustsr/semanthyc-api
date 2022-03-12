import { CategoryService } from '@services';
import { PermissionUtils } from '@utils';
import BaseController from './base';

export default class CategoryController extends BaseController {
	constructor() {
		super();

		this.categoryService = new CategoryService();

		this.bindActions(['store', 'list', 'find', 'update', 'destroy']);
	}

	async store(req, res) {
		try {
			await PermissionUtils.verifyManagerPermission(req.auth);

			const inventory = await this.categoryService.store({
				...req.data,
				...req.auth
			});

			this.successHandler(inventory, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async list(req, res) {
		try {
			await PermissionUtils.verifyManagerPermission(req.auth);

			const categories = await this.categoryService.list();

			this.successHandler(categories, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async find(req, res) {
		try {
			await PermissionUtils.verifyManagerPermission(req.auth);

			const categories = await this.categoryService.find(req.params.id);

			this.successHandler(categories, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async update(req, res) {
		try {
			await PermissionUtils.verifyManagerPermission(req.auth);

			const category = await this.categoryService.update({
				id: req.params.id,
				...req.data
			});

			this.successHandler(category, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async destroy(req, res) {
		try {
			await PermissionUtils.verifyManagerPermission(req.auth);

			const category = await this.categoryService.destroy({ id: req.params.id });

			this.successHandler(category, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}
}
