import BaseRoutes from './base';
import { CategorySchema } from '@schemas';
import { CategoryController } from '@controllers';

export default class CategoryRoutes extends BaseRoutes {
	constructor() {
		super();

		this.categoryController = new CategoryController();
	}

	setup() {
		this.router.get('/', this.categoryController.list);
		this.router.get('/:id', this.SchemaValidator.validate(CategorySchema.find), this.categoryController.find);
		this.router.post('/', this.SchemaValidator.validate(CategorySchema.store), this.categoryController.store);
		this.router.put('/:id', this.SchemaValidator.validate(CategorySchema.update), this.categoryController.update);
		this.router.delete('/:id', this.SchemaValidator.validate(CategorySchema.find), this.categoryController.destroy);

		return this.router;
	}
}
