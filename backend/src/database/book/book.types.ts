import mongoose, { Model } from 'mongoose';

export interface IBook {
	name: string;
	price: string;
	author: string;
	imageUrl: string;
	description: string;
	tags: string[];
}

export interface IBookDocument extends IBook, mongoose.Document {
	updateBook(this: IBookDocument, newBook: IBook): Promise<IBookDocument>;
}

export interface IBookModel extends Model<IBookDocument> {
	findByNameLike(this: IBookModel, name: string): Promise<IBookDocument[]>;
}
