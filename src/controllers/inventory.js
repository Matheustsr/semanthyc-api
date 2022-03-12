import { InventoryService } from '@services';
import { PermissionUtils } from '@utils';
import BaseController from './base';
import { Op } from 'sequelize';

export default class InventoryController extends BaseController {
	constructor() {
		super();

		this.inventoryService = new InventoryService();

		this.bindActions(['store', 'list', 'update', 'destroy', 'reportTopSelling']);
	}

	async store(req, res) {
		try {
			await PermissionUtils.verifyManagerPermission(req.auth);

			const inventory = await this.inventoryService.store({
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

			if (req.auth.is_root) {
				const companies = await this.inventoryService.listAllInventories();

				this.successHandler(companies, res);
				return;
			}

			const companies = await this.inventoryService.listInventoriesByManager(req.auth.company_id);

			this.successHandler(companies, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async update(req, res) {
		try {
			await PermissionUtils.verifyManagerPermission(req.auth);

			const inventory = await this.inventoryService.update({
				id: req.params.id,
				...req.data,
				...req.auth
			});

			this.successHandler(inventory, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async destroy(req, res) {
		try {
			await PermissionUtils.verifyManagerPermission(req.auth);

			const inventory = await this.inventoryService.destroy({
				id: req.params.id,
				...req.data,
				...req.auth
			});

			this.successHandler(inventory, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async reportTopSelling(req, res) {
		try {
			await PermissionUtils.verifyRootPermission(req.auth);

			const filter = {};

			if (req.data.start_date) {
				filter.created_at = {
					[Op.gte]: req.data.start_date
				}
			}

			if (req.data.end_date) {
				filter.created_at = {
					[Op.lte]: req.data.end_date
				}
			}

			const inventory = await this.inventoryService.findTopSellingProducts(filter);

			this.successHandler(inventory, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}
}
