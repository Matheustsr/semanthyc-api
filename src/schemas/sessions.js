import * as yup from 'yup';
import { sanitizeValue } from './utils';

const schema = {
	store: {
		body: yup.object({
			email: yup.string().min(1).transform(sanitizeValue).required(),
			password: yup.string().min(1).required()
		}).noUnknown(),
	}
};

export default {
	store: schema.store
};
