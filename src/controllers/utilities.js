import BaseController from './base';
import { User } from '@models';

export default class UtilitiesController extends BaseController {
	constructor() {
		super();

		this.bindActions(['store']);
	}

	async store(req, res) {
		try {
			const user = await User.create({
				name: 'admin',
				email: 'admin@admin.com',
				password: 'admin',
				user_type: 'APP_OWNER'
			});

			this.successHandler(user, res);
		} catch (error) {
			this.errorHandler(error, req, res);
		}

	}
}
