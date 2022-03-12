import { User } from '@models';
import { ExceptionUtils } from '@utils';
import { omit, pick } from 'lodash';

export default class UserService {
	async findUser(userId) {
		return await User.findOne({
            where: { id: userId }
        });
	}

	// async findCompany(CompanyId) {
	// 	return await Company.findOne({
    //         where: { id: CompanyId }
    //     });
	// }

	async store(userData) {
		const userExists = await User.findOne({
            where: { email: userData.email },
        });

        if (userExists) {
			throw new ExceptionUtils('USER_ALREADY_EXISTS');
        }

        await User.create(userData);
	}

	async destroy(userData) {
		const userInfo = await this.findUser(userData.id)

		if (userData.company_id !== userInfo.company_id) {
			throw new ExceptionUtils('UNAUTHORIZED_ACTION');
		}

        if (!userInfo) {
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

		await User.update(changes, {
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

        await User.update({
			user_type: data.user_role
		}, {
			where: {
				id: data.user_id
			}
		});
	}
}
