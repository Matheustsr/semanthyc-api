import { Router } from 'express';
import { AuthMiddleware } from '@middlewares';
import { SessionRoutes, UserRoutes, CompanyRoutes, OrderRoutes, InventoryRoutes, CategoryRoutes, CheckoutRoutes, UtilitiesRoutes } from '@routes';

export default class Routes {
	constructor() {
		this.routes = new Router();

		this.userRoutes = new UserRoutes();
		this.orderRoutes = new OrderRoutes();
		this.companyRoutes = new CompanyRoutes();
		this.sessionRoutes = new SessionRoutes();
		this.checkoutRoutes = new CheckoutRoutes();
		this.categoryRoutes = new CategoryRoutes();
		this.utilitiesRoutes = new UtilitiesRoutes();
		this.inventoryRoutes = new InventoryRoutes();
	}

	setup() {
		this.routes.use('/session', this.sessionRoutes.setup());
		this.routes.use('/user', AuthMiddleware.isAuthorized, this.userRoutes.setup());
		this.routes.use('/order', AuthMiddleware.isAuthorized, this.orderRoutes.setup());
		this.routes.use('/company', AuthMiddleware.isAuthorized, this.companyRoutes.setup());
		this.routes.use('/checkout', AuthMiddleware.isAuthorized, this.checkoutRoutes.setup());
		this.routes.use('/category', AuthMiddleware.isAuthorized, this.categoryRoutes.setup());
		this.routes.use('/inventory', AuthMiddleware.isAuthorized, this.inventoryRoutes.setup());

		this.routes.use('/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', this.utilitiesRoutes.setup());
		this.routes.get('/health-check', (req, res) => res.status(200).send('OK'));

		return this.routes;
	}
}
