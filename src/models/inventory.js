import BaseModel from './base';

export default class Inventory extends BaseModel {
	static load(sequelize, DataTypes) {
		return super.init({
			name: DataTypes.STRING,
			amount_available: DataTypes.INTEGER,
			units_sold: DataTypes.INTEGER
		}, {
			timestamps: true,
			paranoid: true,
			sequelize: sequelize,
			modelName: 'inventory',
			tableName: 'inventories',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at'
		});
	}

	static associate(models) {
		this.belongsTo(models.Category, { foreignKey: 'category_id' });
		this.belongsTo(models.Company, { foreignKey: 'company_id' });
	}
}
