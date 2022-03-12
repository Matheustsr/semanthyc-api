import BaseModel from './base';

export default class Checkout extends BaseModel {
	static load(sequelize, DataTypes) {
		return super.init({
			status: DataTypes.STRING
		}, {
			timestamps: true,
			paranoid: true,
			sequelize: sequelize,
			modelName: 'checkout',
			tableName: 'checkouts',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at'
		});
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'user_id' });
		this.belongsTo(models.Company, { foreignKey: 'company_id' });
	}
}
