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
			company_id: yup.number().required()
		}).noUnknown()
	},
	update: {
		body: yup.object({
			status: yup.string().transform(sanitizeValue).max(255)
				.oneOf(['AWAITING_PAYMENTH', 'SOLD', 'DENIED']),
			user_id: yup.number(),
			company_id: yup.number()
		}),
		params: yup.object({
			id: yup.number().required()
		}).noUnknown()
	},
	find: {
		params: yup.object({
			id: yup.number().required()
		}).noUnknown()
	}
};

export default {
	store: schema.store,
	update: schema.update,
	find: schema.find
};
