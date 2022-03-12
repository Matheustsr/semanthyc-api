import BaseModel from './base';

export default class Company extends BaseModel {
	static load(sequelize, DataTypes) {
		return super.init({
			name: DataTypes.STRING,
			address: DataTypes.STRING
		}, {
			timestamps: true,
			paranoid: true,
			sequelize: sequelize,
			modelName: 'company',
			tableName: 'companies',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at'
		});
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'creator_id' });
	}
}
