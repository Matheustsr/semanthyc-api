import { UserSchema } from '@schemas';
import { UserController } from '@controllers';
import { AuthMiddleware } from '@middlewares';
import BaseRoutes from './base';

export default class UserRoutes extends BaseRoutes {
	constructor() {
		super();

		this.userController = new UserController();
	}

	setup() {
		this.router.post('/', AuthMiddleware.isAuthorized, this.SchemaValidator.validate(UserSchema.store), this.userController.store);
		this.router.delete('/:user_id', AuthMiddleware.isAuthorized, this.SchemaValidator.validate(UserSchema.find), this.userController.destroy);
		this.router.get('/', AuthMiddleware.isAuthorized, this.userController.listUsers);
		this.router.put('/:user_id', AuthMiddleware.isAuthorized, this.SchemaValidator.validate(UserSchema.update), this.userController.update);
	this.router.put('/role/:user_id', AuthMiddleware.isAuthorized, this.SchemaValidator.validate(UserSchema.updateRole), this.userController.updateRole);

		return this.router;
	}
}
