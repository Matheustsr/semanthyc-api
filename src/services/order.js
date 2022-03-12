import { ExceptionUtils } from '@utils';
import { Order } from '@models';


export default class OrderService {
	async findOrder(orderId) {
		return await Order.findOne({
            where: { id: orderId }
        });
	}

	// async findCompany(companyId) {
	// 	return await Company.findOne({
    //         where: { id: companyId }
    //     });
	// }

	// async getEmployee(userId) {
	// 	return await Employee.findOne({
    //         where: { id: userId }
    //     });
	// }

	store(orderData) {
		orderData.company_id = orderData.company_id;
		orderData.checkout_id = 1;// tempo - REMOVER QUANDO O CHECKOUR CRIAR AUTOMATICAMENT

    	return Order.create(orderData);
	}

	listAllOrders() {
		return Order.findAll();
	}

	listUserOrders(userId) {
		return Order.findAll({where: { user_id: userId }});
	}

	listOrdersbyCompany(company) {
		return Order.findAll({ where: { company_id: company.id } });
	}

	async destroy(orderData) {
		const orderInfo = await this.findOrder(orderData.id)

        if (!orderInfo) {
			throw new ExceptionUtils('INVALID_ORDER');
        }

        if (orderInfo.user_id !== orderData.user_id && !orderData.is_root) {
			throw new ExceptionUtils('UNAUTHORIZED_ACTION');
		}

		if (orderInfo.status !== 'PENDING') {
			throw new ExceptionUtils('ORDER_FINISHED');
		}

        await Order.destroy({ where: { id: orderData.id } });
	}

	// async list({ id }) {
	// 	return await Department.findAll({
	// 		where: { manager_id: id },
	// 		attributes: ['id', 'name']
	// 	});
	// }

	// async listEmployees({ id }) {
	// 	return await Employee.findAll({
	// 		where: { department_id: id }
	// 	});
	// }

	// async updateManager(data) {
	// 	const departmentExists = await this.findDepartment(data.id)
	// 	const employeeData = await this.getEmployee(data.manager_id)

    //     if (!departmentExists) {
	// 		throw new ExceptionUtils('INVALID_DEPARTMENT');
    //     }

	// 	if (employeeData.user_type !== 'MANAGER') {
	// 		throw new ExceptionUtils('NOT_AUTHORIZED!');
	// 	}

	// 	await Department.update({
	// 		manager_id: data.manager_id
	// 	}, {
	// 		where: {
	// 			id: data.id
	// 		}
	// 	});
	// }

	// async updateCompany(data) {
	// 	const companyExists = await this.findCompany(data.id)

	// 	if (!companyExists) {
	// 		throw new ExceptionUtils('INVALID_COMPANY');
    //     }
	// 	await Department.update({
	// 		company_id: data.id
	// 	}, {
	// 		where: {
	// 			id: data.department_id
	// 		}
	// 	});
	// }
}
