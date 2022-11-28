import mongoose, { Model } from 'mongoose';

export interface IUser {
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
	cart: ICartItem[];
}

export interface ICartItem {
	bookId: mongoose.Types.ObjectId;
	quantity: number;
}

export interface IUserDocument extends IUser, mongoose.Document {
	addToCart(this: IUserDocument, bookId: mongoose.Types.ObjectId): Promise<void>;

	removeFromCart(this: IUserDocument, bookId: mongoose.Types.ObjectId): Promise<number>;
}

export interface IUserModel extends Model<IUserDocument> {}
