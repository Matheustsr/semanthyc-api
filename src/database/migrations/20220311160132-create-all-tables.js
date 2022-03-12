'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable('inventories', {
				id: {
					type: Sequelize.DataTypes.INTEGER,
					allowNull: false,
					autoIncrement: true,
					primaryKey: true
				},
				name: {
					type: Sequelize.DataTypes.STRING,
					allowNull: false
				},
				amout_available: {
					type: Sequelize.DataTypes.INTEGER,
					allowNull: false,
					defaultValue: 0
				},
				units_sold: {
					type: Sequelize.DataTypes.INTEGER,
					allowNull: false,
					defaultValue: 0
				}
			}, { transaction });
			await queryInterface.createTable('users', {
				id: {
					type: Sequelize.DataTypes.INTEGER,
					allowNull: false,
					autoIncrement: true,
					primaryKey: true
				},
				name: {
					type: Sequelize.DataTypes.STRING,
					allowNull: false
				},
				contact_cellphone: {
					type: Sequelize.DataTypes.STRING,
					allowNull: true
				},
				email: {
					type: Sequelize.DataTypes.STRING,
					allowNull: false
				},
				password: {
					type: Sequelize.DataTypes.STRING,
					allowNull: false
				},
				gender: {
					type: Sequelize.DataTypes.STRING,
					allowNull: true
				},
				balance: {
					type: Sequelize.DataTypes.STRING,
					defaultValue: 0
				}
			}, { transaction });
			await queryInterface.createTable('checkouts', {
				id: {
					type: Sequelize.DataTypes.INTEGER,
					allowNull: false,
					autoIncrement: true,
					primaryKey: true
				},
				status: {
					type: Sequelize.DataTypes.STRING,
					defaultValue: 'AWAITING_PAYMENTH'
				}
			}, { transaction });
			await queryInterface.createTable('orders', {
				id: {
					type: Sequelize.DataTypes.INTEGER,
					allowNull: false,
					autoIncrement: true,
					primaryKey: true
				},
				status: {
					type: Sequelize.DataTypes.STRING,
					defaultValue: 'PENDING'
				},
				sale_date: {
					type: Sequelize.DataTypes.STRING,
					allowNull: true
				}
			}, { transaction });
			await queryInterface.createTable('categories', {
				id: {
					type: Sequelize.DataTypes.INTEGER,
					allowNull: false,
					autoIncrement: true,
					primaryKey: true
				},
				description: {
					type: Sequelize.DataTypes.STRING,
					allowNull: false,
				}
			}, { transaction });
			await queryInterface.createTable('companies', {
				id: {
					type: Sequelize.DataTypes.INTEGER,
					allowNull: false,
					autoIncrement: true,
					primaryKey: true
				},
				name: {
					type: Sequelize.DataTypes.STRING,
					allowNull: false
				},
				address: {
					type: Sequelize.DataTypes.STRING,
					allowNull: false
				},
				active: {
					type: Sequelize.DataTypes.BOOLEAN,
					allowNull: false,
					defaultValue: true
				}
			}, { transaction });

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	},

	down: async queryInterface => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.dropTable('inventories', { transaction });
			await queryInterface.dropTable('user', { transaction });
			await queryInterface.dropTable('checkouts', { transaction });
			await queryInterface.dropTable('orders', { transaction });
			await queryInterface.dropTable('categories', { transaction });
			await queryInterface.dropTable('companies', { transaction });
			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
};
