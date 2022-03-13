import * as yup from 'yup';
import { sanitizeValue } from './utils';

const schema = {
	store: {
		body: yup.object({
			name: yup.string().min(1).transform(sanitizeValue).max(255).required(),
			contact_cellphone: yup.string().min(1).transform(sanitizeValue).max(255).required(),
			email: yup.string().min(1).transform(sanitizeValue).max(255).required(),
			password: yup.string().min(1).transform(sanitizeValue).max(255).required(),
			company_id: yup.number(),
			gender: yup.string().min(1).transform(sanitizeValue).max(255).nullable(),
			user_type: yup.string().transform(sanitizeValue).max(255)
				.oneOf(['CUSTOMER', 'STORE_MANAGER', 'APP_OWNER'])
		}).noUnknown(),
	},
	find: {
		params: yup.object({
			user_id: yup.number().required()
		}).noUnknown()
	},
	update: {
		params: yup.object({
			user_id: yup.number().required()
		}).noUnknown(),
		body: yup.object({
			name: yup.string().min(1).transform(sanitizeValue).max(255).nullable(),
			contact_cellphone: yup.string().min(1).transform(sanitizeValue).max(255),
			email: yup.string().min(1).transform(sanitizeValue).max(255),
			password: yup.string().min(1).transform(sanitizeValue).max(255),
			gender: yup.string().min(1).transform(sanitizeValue).max(255).nullable(),
			company_id: yup.number(),
			user_type: yup.string().transform(sanitizeValue).max(255)
				.oneOf(['CUSTOMER', 'STORE_MANAGER', 'APP_OWNER'])
		}).noUnknown()
	},
	updateRole: {
		params: yup.object({
			user_id: yup.number().required()
		}).noUnknown(),
		body: yup.object({
			user_type: yup.string().transform(sanitizeValue).max(255)
				.oneOf(['CUSTOMER', 'STORE_MANAGER', 'APP_OWNER']).required()
		})
	},
	reportByDate: {
		body: yup.object({
			start_date: yup.string().min(1).transform(sanitizeValue),
			end_date: yup.string().min(1).transform(sanitizeValue)
		}).noUnknown()
	}
};

export default {
	store: schema.store,
	find: schema.find,
	update: schema.update,
	updateRole: schema.updateRole,
	reportByDate: schema.reportByDate
};
