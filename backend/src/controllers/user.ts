import { RequestHandler } from 'express';
import { User } from '../database/user/user.model';
import { Book } from '../database/book/book.model';

export const getSelf: RequestHandler<never, any, { userId: string }> = (req, res) => {
	User.findById(req.body.userId)
		.select('-__v -password -cart')
		.then((u) => {
			if (u === null) {
				res.status(403).send({ error: 'The requested user was not found' });
				return;
			}
			return res.status(200).json(u);
		})
		.catch(() => res.status(400).send({ error: 'There was an error getting the user' }));
};

export const getCartItems: RequestHandler<never, any, { userId: string }> = (req, res) => {
	User.findById(req.body.userId)
		.select('cart')
		.populate('cart')
		.then((u) => {
			if (u === null) {
				res.status(403).send({ error: 'The requested user was not found' });
				return;
			}
			return res.status(200).json(u.cart);
		})
		.catch(() => res.status(400).send({ error: 'There was an error getting the user' }));
};

export const addToCart: RequestHandler<{ bookId: string }, any, { userId: string }> = async (req, res) => {
	User.findById(req.body.userId)
		.populate('cart')
		.then((u) => {
			if (u === null) {
				res.status(403).send({ error: 'The requested user was not found' });
				return;
			}
			Book.findById(req.params.bookId).then(async (b) => {
				if (b === null) {
					res.status(404).send({ error: 'The requested book was not found' });
					return;
				}
				await u.addToCart(b._id);
				res.status(200).send();
			});
		});
};

export const removeFromCart: RequestHandler<{ bookId: string }, any, { userId: string }> = async (req, res) => {
	User.findById(req.body.userId)
		.populate('cart')
		.then((u) => {
			if (u === null) {
				res.status(403).send({ error: 'The requested user was not found' });
				return;
			}
			Book.findById(req.params.bookId).then(async (b) => {
				if (b === null || u.cart.find((bk) => bk.bookId.toString() === b._id.toString()) === undefined) {
					res.status(404).send({ error: 'The requested book was not found' });
					return;
				}
				console.log('caled');
				await u.removeFromCart(b._id);
				console.log('caled');
				res.status(200).send();
			});
		});
};
