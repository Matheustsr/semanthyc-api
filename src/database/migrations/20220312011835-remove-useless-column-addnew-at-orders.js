'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await Promise.all([
				queryInterface.changeColumn('orders', 'items', {
					type: Sequelize.DataTypes.STRING,
					allowNull: true
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
				queryInterface.changeColumn('orders', 'items', {
					type: Sequelize.DataTypes.STRING,
					allowNull: true
				}, { transaction })
			]);

			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
};
