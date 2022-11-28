import { RequestHandler } from 'express';
import { Book } from '../database/book/book.model';
import mongoose from 'mongoose';
import { IBookDocument } from '../database/book/book.types';

export const createBook: RequestHandler<never, any, IBookDocument> = (req, res) => {
	const book: IBookDocument = req.body;
	book._id = new mongoose.Types.ObjectId();
	Book.create(book)
		.then((b) => res.status(201).send({ bookId: b._id }))
		.catch(() => res.status(400).send({ error: 'There was an error creating the book' }));
};

export const updateBook: RequestHandler<never, any, IBookDocument> = (req, res) => {
	const book = req.body;
	Book.findById(book._id).then((b: IBookDocument | null) => {
		if (b === null) {
			res.status(404).send({ error: 'The requested bo	ok was not found' });
			return;
		}
		b.updateBook(book)
			.then(() => res.status(200).send())
			.catch(() => res.status(400).send({ error: 'There was an error updating the book' }));
	});
};

export const getBookById: RequestHandler<{ bookId: string }, any, never> = (req, res) => {
	Book.findById(req.params.bookId)
		.select('-__v -carts')
		.then((b: IBookDocument | null) => {
			if (b === null) {
				res.status(404).send({ error: 'The requested book was not found' });
				return;
			}
			return res.status(200).json(b);
		})
		.catch(() => res.status(400).send({ error: 'There was an error getting the book' }));
};

export const getBooksByName: RequestHandler<{ name: string }, any, never> = (req, res) => {
	Book.findByNameLike(req.params.name ? req.params.name : '')
		.then((b) => res.status(200).json(b))
		.catch(() => res.status(400).send({ error: 'There was an error getting the books' }));
};

export const deleteBook: RequestHandler<{ bookId: string }, any, never> = async (req, res) => {
	const b = await Book.findById(req.params.bookId);
	if (b === null) {
		res.status(404).send({ error: 'The requested book was not found' });
		return;
	}
	await b.delete();
	res.status(200).send();
};
