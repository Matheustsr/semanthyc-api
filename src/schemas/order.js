import * as yup from 'yup';
import { sanitizeValue } from './utils';

const schema = {
	store: {
		body: yup.object({
			items: yup.array().of(
				yup.object({
					id: yup.number().min(1).required(),
					quantity: yup.number().required(),
					group_type: yup.string().max(255)
				}).noUnknown()
			)
		}).noUnknown()
	},
	// store: {
	// 	body: yup.array({
	// 		items: yup.object().shape(
	// 			yup.object().shape({
	// 				id: yup.number().required(),
	// 				quantity: yup.string().required()
	// 			})
	// 		).required()
	// 	})
	// },

	// body: yup.array().of(
	// 	yup.object().shape({
	// 		body: yup.object().shape({
	// 			id: yup.number().required('Company is required'),
	// 			quantity: yup.string().required('Company is required').max(100, 'Maximum characters upto 100.')
	// 		})
	// 	}).required()
	// ).required('Company is required').max(100, 'Maximum characters up to 100.'),
	find: {
		params: yup.object({
			id: yup.number().required()
		}).noUnknown()
	},
	// updateManager: {
	// 	params: yup.object({
	// 		id: yup.number().required()
	// 	}).noUnknown(),
	// 	body: yup.object({
	// 		manager_id: yup.string().min(1).transform(sanitizeValue).required()
	// 	})
	// },
	// updateCompany: {
	// 	params: yup.object({
	// 		id: yup.number().required(),
	// 		department_id: yup.number().required()
	// 	}).noUnknown()
	// }
};

export default {
	store: schema.store,
	find: schema.find,
	// updateManager: schema.updateManager,
	// updateCompany: schema.updateCompany
};
