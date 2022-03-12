import BaseModel from './base';
import bcrypt from 'bcryptjs';

export default class User extends BaseModel {
	static load(sequelize, DataTypes) {
		return super.init({
			name: DataTypes.STRING,
			contact_cellphone: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			gender: DataTypes.STRING,
			balance: DataTypes.INTEGER,
			user_type: DataTypes.STRING
		}, {
			timestamps: true,
			paranoid: true,
			sequelize: sequelize,
			modelName: 'user',
			tableName: 'users',
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at'
		}),
		this.addHook('beforeSave', async (user) => {
            if (user.dataValues.password) {
                user.password = await bcrypt.hash(user.dataValues.password, 8);
            }
        });
	}

	static associate(models) {
		this.belongsTo(models.Company, { foreignKey: 'company_id' });
	}

	static checkPassword(password, hash) {
        return bcrypt.compare(password, hash);
    }
}
