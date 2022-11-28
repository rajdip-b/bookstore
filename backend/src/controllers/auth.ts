import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { JWT_SECRET } from '../data';
import { User } from '../database/user/user.model';
import { IUser, IUserDocument } from '../database/user/user.types';

export const signUp: RequestHandler<never, any, IUserDocument> = (req, res) => {
	const user = req.body;
	bcrypt.hash(user.password, 12).then((hash) => {
		user.password = hash;
		user._id = new mongoose.Types.ObjectId();
		User.create(user)
			.then((u) => {
				res.status(201).json({ token: generateToken(u.email) });
			})
			.catch((err: Error) => res.status(400).json({ error: 'User already exists!' }));
	});
};

export const signIn: RequestHandler<never, any, Pick<IUser, 'email' | 'password'>> = (req, res) => {
	const user = req.body;
	User.findOne({ email: user.email }).then((u) => {
		if (u == null) {
			res.status(401).send({ error: 'User not found' });
			return;
		}
		bcrypt.compare(user.password, u.password).then((r) => {
			if (r) res.status(200).json({ token: generateToken(u.email) });
			else res.status(403).json({ error: 'Incorrect password' });
		});
	});
};

const generateToken = (email: string): string => {
	return jwt.sign({ email }, JWT_SECRET, {
		subject: email,
		issuer: 'Bookstore',
		algorithm: 'HS256',
		expiresIn: '10h',
	});
};
