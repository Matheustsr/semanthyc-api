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
		}).noUnknown(),
		params: yup.object({
			company_id: yup.number().min(1).required()
		}).noUnknown()
	},
	find: {
		params: yup.object({
			id: yup.number().required()
		}).noUnknown()
	},
	reportByDate: {
		body: yup.object({
			start_date: yup.string().min(1).transform(sanitizeValue),
			end_date: yup.string().min(1).transform(sanitizeValue)
		}).noUnknown()
	},
	update: {
		params: yup.object({
			id: yup.number().required()
		}).noUnknown(),
		body: yup.object({
			sale_date: yup.string().min(1).transform(sanitizeValue),
			items: yup.array().of(
				yup.object({
					id: yup.number().min(1).required(),
					quantity: yup.number().required(),
					group_type: yup.string().max(255)
				}).noUnknown()
			),
			checkout_id: yup.number(),
			company_id: yup.number(),
			user_id: yup.number()
		})
	},
};

export default {
	store: schema.store,
	find: schema.find,
	update: schema.update,
	reportByDate: schema.reportByDate
};
