import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

import { User } from '@models';
import BaseController from './base';


export default class SessionController extends BaseController {
	constructor() {
		super();

		this.bindActions(['store']);
	}

	async store(req, res) {
		const { email, password } = req.data;

        const userExists = await User.findOne({ where: { email }});

        if (!userExists) {
            return res.status(401).json({ error: 'Funcionário inexistente!' });
        }

        if (!(await User.checkPassword(password, userExists.password))) {
            return res.status(401).json({ error: 'Senha incorreta!' });
        }

        const { id, name, user_type, company_id } = userExists;

        return res.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id, email, user_type, company_id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
	}
}
