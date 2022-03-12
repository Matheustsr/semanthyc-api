import { AuthUtils } from '@utils';
import authConfig from '../config/auth';

export default class AuthMiddleware {
	static isAuthorized(req, res, next) {
		const errorResponse = {
			status: 'error',
			code: 403,
			message: 'Sessão expirada. Logue novamente no sistema para obter acesso.',
		};

		const token = AuthUtils.getBearerToken(req);
		const decodedToken = AuthUtils.decodeData(token, authConfig.secret);

		if (!decodedToken || !decodedToken.email || !decodedToken.id) {
			res.status(403).json(errorResponse);

			return;
		}

		req.auth = {
			user_id: decodedToken.id,
			company_id: decodedToken.company_id,
			email: decodedToken.email,
			user_role: decodedToken.user_type
		};

		if (decodedToken.user_type === 'STORE_MANAGER') {
			req.auth.is_manager = true
		}

		if (decodedToken.user_type === 'APP_OWNER') {
			req.auth.is_root = true
			req.auth.is_manager = true
		}

		next();
	}
}
