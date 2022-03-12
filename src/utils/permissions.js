import { ExceptionUtils } from '@utils';

export default class PermissionUtils {
	static verifyManagerPermission(reqData) {
		if (!reqData.is_manager) {
			throw new ExceptionUtils('NOT_AUTHORIZED');
		}
	}

	static verifyRootPermission(reqData) {
		if (!reqData.is_root) {
			throw new ExceptionUtils('NOT_AUTHORIZED');
		}
	}

	static verifyRegisterPermissions(req) {
		if (req.data.user_type === 'APP_OWNER' || req.data.user_type === 'STORE_MANAGER') {
			if (!req.auth.is_root || !req.auth.is_manager) {
				throw new ExceptionUtils('NOT_AUTHORIZED');
			}
		}
	}
}
