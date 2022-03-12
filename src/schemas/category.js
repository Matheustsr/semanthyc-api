import * as yup from 'yup';
import { sanitizeValue } from './utils';

const schema = {
	store: {
		body: yup.object({
			description: yup.string().min(1).transform(sanitizeValue).required()
		}).noUnknown(),
	},
	find: {
		params: yup.object({
			id: yup.number().min(1).required()
		}).noUnknown(),
	},
	update: {
		params: yup.object({
			id: yup.number().min(1).required()
		}),
		body: yup.object({
			description: yup.string().min(1).transform(sanitizeValue).required()
		}).noUnknown(),
	}
};

export default {
	store: schema.store,
	find: schema.find,
	update: schema.update
};
