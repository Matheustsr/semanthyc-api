import { Router } from 'express';

import { SessionRoutes, UserRoutes, CompanyRoutes, OrderRoutes, InventoryRoutes, CategoryRoutes, CheckoutRoutes } from '@routes';
import { AuthMiddleware } from '@middlewares';

export default class Routes {
	constructor() {
		this.routes = new Router();

		this.sessionRoutes = new SessionRoutes();
		this.userRoutes = new UserRoutes();
		this.companyRoutes = new CompanyRoutes();
		this.orderRoutes = new OrderRoutes();
		this.inventoryRoutes = new InventoryRoutes();
		this.categoryRoutes = new CategoryRoutes();
		this.checkoutRoutes = new CheckoutRoutes();
	}

	setup() {
		this.routes.use('/session', this.sessionRoutes.setup());
		this.routes.use('/user', AuthMiddleware.isAuthorized, this.userRoutes.setup());
		this.routes.use('/company', AuthMiddleware.isAuthorized, this.companyRoutes.setup());
		this.routes.use('/order', AuthMiddleware.isAuthorized, this.orderRoutes.setup());
		this.routes.use('/inventory', AuthMiddleware.isAuthorized, this.inventoryRoutes.setup());
		this.routes.use('/category', AuthMiddleware.isAuthorized, this.categoryRoutes.setup());
		this.routes.use('/checkout', AuthMiddleware.isAuthorized, this.checkoutRoutes.setup());

		return this.routes;
	}
}
