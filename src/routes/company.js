import BaseRoutes from './base';
import { CompanySchema } from '@schemas';
import { CompanyController } from '@controllers';

export default class CompanyRoutes extends BaseRoutes {
	constructor() {
		super();

		this.companyController = new CompanyController();
	}

	setup() {
		this.router.get('/', this.companyController.list);
		this.router.post('/', this.SchemaValidator.validate(CompanySchema.store), this.companyController.store);
		this.router.put('/:id', this.SchemaValidator.validate(CompanySchema.find), this.companyController.update);
		this.router.delete('/:id', this.SchemaValidator.validate(CompanySchema.find), this.companyController.destroy);

		return this.router;
	}
}
