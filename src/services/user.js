import { User, Order } from '@models';
import { omit, pick } from 'lodash';
import { ExceptionUtils } from '@utils';
import BaseService from './base';
import { Sequelize } from 'sequelize';

export default class UserService extends BaseService {
	async store(userData) {
		const userExists = await User.findOne({
            where: { email: userData.email },
        });

        if (userExists) {
			throw new ExceptionUtils('USER_ALREADY_EXISTS');
        }

        return await User.create(userData);
	}

	async destroy(userData) {
		const userInfo = await this.findUser(userData.id)

		if (userData.company_id !== userInfo.company_id) {
			throw new ExceptionUtils('UNAUTHORIZED_ACTION');
		} else if (!userInfo) {
			throw new ExceptionUtils('INVALID_USER');
        }

        await User.destroy({ where: { id: userData.id } });
	}

	listAllUsers() {
		return User.findAll();
	}

	listUsersByCompany(companyId) {
		return User.findAll({ where: { company_id: companyId } });
	}

	async updateUser(userChanges) {
		const changes = omit(userChanges, ['balance', 'user_type']);

		return await User.update(changes, {
			where: {
				id: userChanges.user_id
			}
		});
	}

	async updateRole(data) {
		const userExists = await this.findUser(data.user_id)
		pick(data, ['user_type']);

        if (!userExists) {
			throw new ExceptionUtils('INVALID_USER');
        }

        return await User.update({
			user_type: data.user_role
		}, {
			where: {
				id: data.user_id
			}
		});
	}

	async findUsersByGreaterExpense(filter) {
		return Order.findAll({
			where: {
				...filter
			},
			raw: true,
			attributes: [
				'user_id',
				[Sequelize.fn('COUNT', Sequelize.col('user_id')), 'Compras realizadas']
			],
			order: [
				['user_id', 'DESC']
			],
			group: ['user_id']
		});
	}
}
