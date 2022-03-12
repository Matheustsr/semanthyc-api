import { OrderSchema } from '@schemas';
import { OrderController } from '@controllers';
import { AuthMiddleware } from '@middlewares';
import BaseRoutes from './base';

export default class OrderRoutes extends BaseRoutes {
	constructor() {
		super();

		this.orderController = new OrderController();
	}

	setup() {
		this.router.post('/', AuthMiddleware.isAuthorized, this.SchemaValidator.validate(OrderSchema.store), this.orderController.store);
		this.router.get('/', AuthMiddleware.isAuthorized, this.orderController.list);
		this.router.delete('/:id', AuthMiddleware.isAuthorized, this.SchemaValidator.validate(OrderSchema.find), this.orderController.destroy);

		return this.router;
	}
}
