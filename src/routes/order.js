import BaseRoutes from './base';
import { OrderSchema } from '@schemas';
import { OrderController } from '@controllers';

export default class OrderRoutes extends BaseRoutes {
	constructor() {
		super();

		this.orderController = new OrderController();
	}

	setup() {
		this.router.get('/', this.orderController.list);
		this.router.put('/:id', this.SchemaValidator.validate(OrderSchema.update), this.orderController.update);
		this.router.delete('/:id', this.SchemaValidator.validate(OrderSchema.find), this.orderController.destroy);
		this.router.post('/:company_id', this.SchemaValidator.validate(OrderSchema.store), this.orderController.store);
		this.router.get('/report/:id', this.SchemaValidator.validate(OrderSchema.find), this.orderController.findOrdersByUser);
		this.router.get('/report', this.SchemaValidator.validate(OrderSchema.reportByDate), this.orderController.findOrdersByPeriod);

		return this.router;
	}
}
