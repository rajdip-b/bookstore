import * as mongoose from 'mongoose';
import { addToCart, removeFromCart } from './user.methods';

const UserSchema = new mongoose.Schema({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		required: true,
	},
	cart: [
		{
			bookId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Book',
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
			},
		},
	],
});

UserSchema.methods.addToCart = addToCart;
UserSchema.methods.removeFromCart = removeFromCart;

export default UserSchema;
