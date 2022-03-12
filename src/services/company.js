import { Company } from '@models';
import { ExceptionUtils } from '@utils';
import { omit } from 'lodash';

export default class CompanyService {
	async findCompany(companyId) {
		return await Company.findOne({
            where: { id: companyId },
			attributes: ['id', 'name', 'address', 'creator_id']
        });
	}

	listAllCompanies() {
		return Company.findAll();
	}

	listCompaniesByManager(managerId) {
		return Company.findAll({ where: { id: managerId } });
	}


	async store(companyData) {
		const companyExists = await Company.findOne({ where: { name: companyData.name }, logging: true });
		companyData.creator_id = companyData.user_id

        if (companyExists) {
			throw new ExceptionUtils('COMPANY_ALREADY_EXISTS');
        }

        await Company.create(companyData);
	}

	async edit(companyData) {
		const changes = omit(companyData, ['creator_id', 'email', 'company_id', 'is_manager', 'deleted_at', 'created_at', 'updated_at']);
		const companyExists = await this.findCompany(companyData.id)

        if (!companyExists) {
			throw new ExceptionUtils('INVALID_COMPANY');
        }

		if (companyData.user_id !== companyExists.creator_id && !companyData.is_root) {
			throw new ExceptionUtils('UNAUTHORIZED_ACTION');
		}

        await Company.update(changes, {
			where: {
				id: companyData.id
			}
		});
	}

	async destroy(companyData) {
		const companyExists = await this.findCompany(companyData.id)

        if (!companyExists) {
			throw new ExceptionUtils('INVALID_COMPANY');
        }

        await Company.destroy({ where: { id: companyData.id } });
	}
}
