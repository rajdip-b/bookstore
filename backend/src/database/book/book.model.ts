import mongoose from 'mongoose';
import { IBookDocument, IBookModel } from './book.types';
import BookSchema from './book.schema';

export const Book = mongoose.model<IBookDocument, IBookModel>('Book', BookSchema);
