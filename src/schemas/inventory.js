import * as yup from 'yup';
import { sanitizeValue } from './utils';

const schema = {
	store: {
		body: yup.object({
			name: yup.string().min(1).transform(sanitizeValue).required(),
			amout_available: yup.number(),
			category_id: yup.number(),
			value: yup.number()
		}).noUnknown(),
	},
	update: {
		body: yup.object({
			name: yup.string().min(1).transform(sanitizeValue),
			amout_available: yup.number(),
			category_id: yup.number(),
			value: yup.number()
		}),
		params: yup.object({
			id: yup.number().required()
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
	}
};

export default {
	store: schema.store,
	update: schema.update,
	find: schema.find,
	reportByDate: schema.reportByDate
};
