'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await Promise.all([
				queryInterface.addColumn('inventories', 'category_id', {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: 'categories',
						key: 'id',
					}
				}, { transaction }),

				queryInterface.addColumn('inventories', 'company_id', {
					type: Sequelize.DataTypes.INTEGER,
					references: {
						model: {
							tableName: 'companies'
						},
						key: 'id'
					},
					allowNull: false
				}, { transaction }),

				queryInterface.addColumn('inventories', 'created_at', {
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
				}, { transaction }),

				queryInterface.addColumn('inventories', 'updated_at', {
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
				}, { transaction }),

				queryInterface.addColumn('inventories', 'deleted_at', {
					type: Sequelize.DATE,
				}, { transaction }),

				queryInterface.addColumn('users', 'user_type', {
					type: Sequelize.DataTypes.STRING,
					defaultValue: 'CUSTOMER',
					allowNull: false
				}, { transaction }),

				queryInterface.addColumn('users', 'company_id', {
					type: Sequelize.DataTypes.INTEGER,
					references: {
						model: {
							tableName: 'companies'
						},
						key: 'id'
					}
				}, { transaction }),

				queryInterface.addColumn('users', 'created_at', {
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
				}, { transaction }),

				queryInterface.addColumn('users', 'updated_at', {
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
				}, { transaction }),

				queryInterface.addColumn('users', 'deleted_at', {
					type: Sequelize.DATE,
				}, { transaction }),

				queryInterface.addColumn('checkouts', 'user_id', {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: 'users',
						key: 'id'
					}
				}, { transaction }),

				queryInterface.addColumn('checkouts', 'company_id', {
					type: Sequelize.DataTypes.INTEGER,
					references: {
						model: {
							tableName: 'companies'
						},
						key: 'id'
					},
					allowNull: false
				}, { transaction }),

				queryInterface.addColumn('checkouts', 'created_at', {
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
				}, { transaction }),

				queryInterface.addColumn('checkouts', 'updated_at', {
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
				}, { transaction }),

				queryInterface.addColumn('checkouts', 'deleted_at', {
					type: Sequelize.DATE,
				}, { transaction }),

				queryInterface.addColumn('orders', 'checkout_id', {
					type: Sequelize.DataTypes.INTEGER,
					references: {
						model: {
							tableName: 'checkouts'
						},
						key: 'id'
					},
					allowNull: false
				}, { transaction }),

				queryInterface.addColumn('orders', 'company_id', {
					type: Sequelize.DataTypes.INTEGER,
					references: {
						model: {
							tableName: 'companies'
						},
						key: 'id'
					},
					allowNull: false
				}, { transaction }),

				queryInterface.addColumn('orders', 'user_id', {
					type: Sequelize.DataTypes.INTEGER,
					references: {
						model: {
							tableName: 'users'
						},
						key: 'id'
					},
					allowNull: false
				}, { transaction }),

				queryInterface.addColumn('orders', 'created_at', {
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
				}, { transaction }),

				queryInterface.addColumn('orders', 'updated_at', {
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
				}, { transaction }),

				queryInterface.addColumn('orders', 'deleted_at', {
					type: Sequelize.DATE,
				}, { transaction }),

				queryInterface.addColumn('categories', 'created_at', {
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
				}, { transaction }),

				queryInterface.addColumn('categories', 'updated_at', {
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
				}, { transaction }),

				queryInterface.addColumn('categories', 'deleted_at', {
					type: Sequelize.DATE,
				}, { transaction }),

				queryInterface.addColumn('companies', 'creator_id', {
					type: Sequelize.DataTypes.INTEGER,
					references: {
						model: {
							tableName: 'users'
						},
						key: 'id'
					}
				}, { transaction }),

				queryInterface.addColumn('companies', 'created_at', {
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
				}, { transaction }),

				queryInterface.addColumn('companies', 'updated_at', {
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
				}, { transaction }),

				queryInterface.addColumn('companies', 'deleted_at', {
					type: Sequelize.DATE,
				}, { transaction })
			]);

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	},

	down: async queryInterface => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await Promise.all([
				queryInterface.removeColumn('inventories', 'category_id', { transaction }),
				queryInterface.removeColumn('inventories', 'company_id', { transaction }),
				queryInterface.removeColumn('inventories', 'created_at', { transaction }),
				queryInterface.removeColumn('inventories', 'updated_at', { transaction }),
				queryInterface.removeColumn('inventories', 'deleted_at', { transaction }),

				queryInterface.removeColumn('users', 'user_type', { transaction }),
				queryInterface.removeColumn('users', 'company_id', { transaction }),
				queryInterface.removeColumn('users', 'created_at', { transaction }),
				queryInterface.removeColumn('users', 'updated_at', { transaction }),
				queryInterface.removeColumn('users', 'deleted_at', { transaction }),

				queryInterface.removeColumn('checkouts', 'user_id', { transaction }),
				queryInterface.removeColumn('checkouts', 'company_id', { transaction }),
				queryInterface.removeColumn('checkouts', 'created_at', { transaction }),
				queryInterface.removeColumn('checkouts', 'updated_at', { transaction }),
				queryInterface.removeColumn('checkouts', 'deleted_at', { transaction }),

				queryInterface.removeColumn('orders', 'checkout_id', { transaction }),
				queryInterface.removeColumn('orders', 'company_id', { transaction }),
				queryInterface.removeColumn('orders', 'user_id', { transaction }),
				queryInterface.removeColumn('orders', 'created_at', { transaction }),
				queryInterface.removeColumn('orders', 'updated_at', { transaction }),
				queryInterface.removeColumn('orders', 'deleted_at', { transaction }),

				queryInterface.removeColumn('categories', 'created_at', { transaction }),
				queryInterface.removeColumn('categories', 'updated_at', { transaction }),
				queryInterface.removeColumn('categories', 'deleted_at', { transaction }),

				queryInterface.removeColumn('companies', 'creator_id', { transaction }),
				queryInterface.removeColumn('companies', 'created_at', { transaction }),
				queryInterface.removeColumn('companies', 'updated_at', { transaction }),
				queryInterface.removeColumn('companies', 'deleted_at', { transaction })
			]);

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
};
