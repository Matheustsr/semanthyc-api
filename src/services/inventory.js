import { Inventory } from '@models';
import { omit } from 'lodash';
import { ExceptionUtils } from '@utils';
import BaseService from './base';


export default class InventoryService extends BaseService {
	async store(inventoryData) {
		const inventoryExists = await Inventory.findOne({ where: { name: inventoryData.name }});
		inventoryData.company_id = inventoryData.company_id

        if (inventoryExists) {
			throw new ExceptionUtils('INVENTORY_ALREADY_EXISTS');
        }

        return await Inventory.create(inventoryData);
	}

	listAllInventories() {
		return Inventory.findAll();
	}

	listInventoriesByManager(companyId) {
		return Inventory.findAll({ where: { company_id: companyId } });
	}

	async update(inventoryData) {
		const changes = omit(inventoryData, ['units_sold', 'deleted_at', 'created_at', 'updated_at']);
		const inventoryExists = await this.findInventory(inventoryData.id)

        if (!inventoryExists) {
			throw new ExceptionUtils('INVALID_COMPANY');
        } else if (inventoryData.company_id !== inventoryExists.company_id && !inventoryData.is_root) {
			throw new ExceptionUtils('UNAUTHORIZED_ACTION');
		}

        return await Inventory.update(changes, {
			where: {
				id: inventoryData.id
			}
		});
	}

	async destroy(inventoryData) {
		const inventoryExists = await this.findInventory(inventoryData.id)

        if (!inventoryExists) {
			throw new ExceptionUtils('INVALID_COMPANY');
        } else if (inventoryData.company_id !== inventoryExists.company_id && !inventoryData.is_root) {
			throw new ExceptionUtils('UNAUTHORIZED_ACTION');
		}

        await Inventory.destroy({ where: { id: inventoryData.id } });
	}

	async findTopSellingProducts(filter) {
		return Inventory.findAll({
			where: {
				...filter
			},
			raw: true,
			attributes: ['id', 'name', 'units_sold'],
			order: [['units_sold', 'DESC']]
		});
	}
}
