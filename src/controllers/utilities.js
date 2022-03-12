import BaseController from './base';
import { Employee } from '@models';

export default class UtilitiesController extends BaseController {
	constructor() {
		super();

		this.bindActions(['store']);
	}

	async store(req, res) {
		try {
			const employee = await Employee.create({
				name: 'admin',
				email: 'admin@admin.com',
				password: 'admin',
				user_type: 'COMPANY_DIRECTOR'
			});

			this.successHandler(employee, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}

	}
}
