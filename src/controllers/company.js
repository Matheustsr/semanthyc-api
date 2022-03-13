import { CompanyService } from '@services';
import { PermissionUtils } from '@utils';
import BaseController from './base';

export default class CompanyController extends BaseController {
	constructor() {
		super();

		this.companyService = new CompanyService();

		this.bindActions(['store', 'list', 'update', 'destroy']);
	}

	async store(req, res) {
		try {
			await PermissionUtils.verifyRootPermission(req.auth);

			const company = await this.companyService.store({
				...req.data,
				...req.auth
			});

			this.successHandler(company, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async list(req, res) {
		try {
			await PermissionUtils.verifyManagerPermission(req.auth);

			if (req.auth.is_root) {
				const companies = await this.companyService.listAllCompanies();

				this.successHandler(companies, res);
				return;
			}

			const companies = await this.companyService.listCompaniesByManager(req.auth.company_id);

			this.successHandler(companies, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async update(req, res) {
		try {
			await PermissionUtils.verifyManagerPermission(req.auth);

			const company = await this.companyService.edit({
				id: req.params.id,
				...req.data,
				...req.auth
			});

			this.successHandler(company, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}

	async destroy(req, res) {
		try {
			await PermissionUtils.verifyRootPermission(req.auth);

			const company = await this.companyService.destroy({ id: req.params.id });

			this.successHandler(company, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}
	}
}
