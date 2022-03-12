import BaseModel from './base';

export default class Category extends BaseModel {
	static load(sequelize, DataTypes) {
		return super.init({
			description: DataTypes.STRING
		}, {
			timestamps: true,
			paranoid: true,
			sequelize: sequelize,
			modelName: 'category',
			tableName: 'categories',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at'
		});
	}
}
