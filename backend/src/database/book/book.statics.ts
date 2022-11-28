import { IBookDocument } from './book.types';
import { Model } from 'mongoose';

export async function findByNameLike(this: Model<IBookDocument>, name: string): Promise<IBookDocument[]> {
	return this.find({ name: { $regex: '.*' + name + '.*' } })
		.select('-__v -carts')
		.exec();
}
