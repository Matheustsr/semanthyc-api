import { CompanySchema } from '@schemas';
import { CompanyController } from '@controllers';
import { AuthMiddleware } from '@middlewares';
import BaseRoutes from './base';

export default class CompanyRoutes extends BaseRoutes {
	constructor() {
		super();

		this.companyController = new CompanyController();
	}

	setup() {
		this.router.post('/', AuthMiddleware.isAuthorized, this.SchemaValidator.validate(CompanySchema.store), this.companyController.store);
		this.router.get('/', AuthMiddleware.isAuthorized, this.companyController.list);
		this.router.put('/:id', AuthMiddleware.isAuthorized, this.SchemaValidator.validate(CompanySchema.find), this.companyController.update);
		this.router.delete('/:id', AuthMiddleware.isAuthorized, this.SchemaValidator.validate(CompanySchema.find), this.companyController.destroy);

		return this.router;
	}
}
