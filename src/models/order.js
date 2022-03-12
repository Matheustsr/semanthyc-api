import BaseModel from './base';

export default class Order extends BaseModel {
	static load(sequelize, DataTypes) {
		return super.init({
			items: DataTypes.JSON,
			sale_date: DataTypes.STRING
		}, {
			timestamps: true,
			paranoid: true,
			sequelize: sequelize,
			modelName: 'order',
			tableName: 'orders',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at'
		});
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'user_id' });
		this.belongsTo(models.Company, { foreignKey: 'company_id' });
		this.belongsTo(models.Checkout, { foreignKey: 'checkout_id' });
	}
}
