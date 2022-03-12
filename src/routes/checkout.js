import BaseRoutes from './base';
import { CheckoutSchema } from '@schemas';
import { CheckoutController } from '@controllers';

export default class CheckoutRoutes extends BaseRoutes {
	constructor() {
		super();

		this.checkoutController = new CheckoutController();
	}

	setup() {
		this.router.put('/:id', this.SchemaValidator.validate(CheckoutSchema.update), this.checkoutController.update);
		this.router.delete('/:id', this.SchemaValidator.validate(CheckoutSchema.find), this.checkoutController.destroy);
		this.router.get('/', this.checkoutController.list);

		return this.router;
	}
}
