import { UtilitiesController } from '@controllers';
import BaseRoutes from './base';

export default class UtilitiesRoutes extends BaseRoutes {
	constructor() {
		super();

		this.utilitiesController = new UtilitiesController();
	}

	setup() {
		this.router.post('/root', this.utilitiesController.store);

		return this.router;
	}
}
