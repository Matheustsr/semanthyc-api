import { Category } from '@models';
import { ExceptionUtils } from '@utils';
import BaseService from './base';


export default class CategoryService extends BaseService {
	async findCategory(categoryId) {
		return await Category.findOne({
            where: { id: categoryId }
        });
	}

	async store(categoryData) {
		const categoryExists = await Category.findOne({ where: { description: categoryData.description }});

        if (categoryExists) {
			throw new ExceptionUtils('CATEGORY_ALREADY_EXISTS');
        }

       return await Category.create(categoryData);
	}

	list() {
        return Category.findAll();
	}

	find(categoryId) {
        return Category.findAll({ where: { id: categoryId } });
	}

	async update(categoryData) {
		const categoryExists = await this.findCategory(categoryData.id)

        if (!categoryExists) {
			throw new ExceptionUtils('INVALID_COMPANY');
        }

        await Category.update(categoryData, {
			where: {
				id: categoryData.id
			}
		});
	}

	async destroy(categoryData) {
		const categoryExists = await this.findCategory(categoryData.id)

        if (!categoryExists) {
			throw new ExceptionUtils('INVALID_COMPANY');
        }

        await Category.destroy({ where: { id: categoryData.id } });
	}
}
