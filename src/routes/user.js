import BaseRoutes from './base';
import { UserSchema } from '@schemas';
import { UserController } from '@controllers';

export default class UserRoutes extends BaseRoutes {
	constructor() {
		super();

		this.userController = new UserController();
	}

	setup() {
		this.router.get('/', this.userController.listUsers);
		this.router.post('/', this.SchemaValidator.validate(UserSchema.store), this.userController.store);
		this.router.put('/:user_id', this.SchemaValidator.validate(UserSchema.update), this.userController.update);
		this.router.delete('/:user_id', this.SchemaValidator.validate(UserSchema.find), this.userController.destroy);
		this.router.put('/role/:user_id', this.SchemaValidator.validate(UserSchema.updateRole), this.userController.updateRole);

		return this.router;
	}
}
