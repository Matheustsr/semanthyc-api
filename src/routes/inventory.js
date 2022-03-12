import BaseRoutes from './base';
import { InventorySchema } from '@schemas';
import { InventoryController } from '@controllers';

export default class InventoryRoutes extends BaseRoutes {
	constructor() {
		super();

		this.inventoryController = new InventoryController();
	}

	setup() {
		this.router.post('/', this.SchemaValidator.validate(InventorySchema.store), this.inventoryController.store);
		this.router.get('/', this.inventoryController.list);
		this.router.put('/:id', this.SchemaValidator.validate(InventorySchema.update), this.inventoryController.update);
		this.router.delete('/:id', this.SchemaValidator.validate(InventorySchema.find), this.inventoryController.destroy);

		return this.router;
	}
}
