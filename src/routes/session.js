import BaseRoutes from './base';
import { SessionSchema } from '@schemas';
import { SessionController } from '@controllers';

export default class SessionRoutes extends BaseRoutes {
	constructor() {
		super();

		this.sessionController = new SessionController();
	}

	setup() {
		this.router.post('/', this.SchemaValidator.validate(SessionSchema.store), this.sessionController.store);

		return this.router;
	}
}
