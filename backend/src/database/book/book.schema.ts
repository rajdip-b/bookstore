import mongoose from 'mongoose';
import { findByNameLike } from './book.statics';
import { updateBook } from './book.methods';

const BookSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	price: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	tags: [
		{
			type: String,
		},
	],
});

BookSchema.statics.findByNameLike = findByNameLike;

BookSchema.methods.updateBook = updateBook;

export default BookSchema;
