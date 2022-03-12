import { Router } from 'express';

import { SessionRoutes, UserRoutes, CompanyRoutes, OrderRoutes } from '@routes';

export default class Routes {
	constructor() {
		this.routes = new Router();

		this.sessionRoutes = new SessionRoutes();
		this.userRoutes = new UserRoutes();
		this.companyRoutes = new CompanyRoutes();
		this.orderRoutes = new OrderRoutes();

		// this.inventoryRoutes = new InventoryRoutes();
		// this.checkoutRoutes = new CheckoutRoutes();
	}

	setup() {
		this.routes.use('/session', this.sessionRoutes.setup());
		this.routes.use('/user', this.userRoutes.setup());
		this.routes.use('/company', this.companyRoutes.setup());
		this.routes.use('/order', this.orderRoutes.setup());

		// this.routes.use('/inventory', this.inventoryRoutes.setup());
		// this.routes.use('/checkout', this.checkoutRoutes.setup());

		return this.routes;
	}
}
