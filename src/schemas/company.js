import * as yup from 'yup';
import { sanitizeValue } from './utils';

const schema = {
	store: {
		body: yup.object({
			name: yup.string().min(1).transform(sanitizeValue).required(),
			address: yup.string().min(1).transform(sanitizeValue).required()
		}).noUnknown(),
	},
	find: {
		params: yup.object({
			id: yup.number().required()
		}).noUnknown(),
		body: yup.object({
			name: yup.string().min(1).transform(sanitizeValue).nullable(),
			address: yup.string().min(1).transform(sanitizeValue).nullable()
		}).noUnknown()
	}
};

export default {
	store: schema.store,
	find: schema.find
};
