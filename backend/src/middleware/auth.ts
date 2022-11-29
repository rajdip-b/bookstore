import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../data';
import { User } from '../database/user/user.model';
import { IUserDocument } from '../database/user/user.types';

export const auth: RequestHandler<never, any, { userId: string }> = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token === null) res.status(403).send({ error: 'No token provided' });
	jwt.verify(token!, JWT_SECRET, (err, data) => {
		if (err) res.status(403).send({ error: 'Invalid token' });
		//@ts-ignore
		User.findOne({ email: data.email })
			.select('_id')
			.then((u: IUserDocument | null) => {
				if (u === null) {
					res.status(403).send({ error: 'User not found' });
					return;
				}
				if ((req.method === 'put' || req.method === 'post' || req.method === 'delete') && !u.isAdmin) {
					res.status(403).send({ error: 'Insufficient privileges' });
					return;
				}
				req.body.userId = u._id.toString();
				next();
			});
	});
};
