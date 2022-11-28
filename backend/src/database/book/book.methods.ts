import { IBook, IBookDocument } from './book.types';

export async function updateBook(this: IBookDocument, newBook: IBook): Promise<IBookDocument> {
	this.name = newBook.name ? newBook.name : this.name;
	this.price = newBook.price ? newBook.price : this.price;
	this.imageUrl = newBook.imageUrl ? newBook.imageUrl : this.imageUrl;
	this.author = newBook.author ? newBook.author : this.author;
	this.description = newBook.description ? newBook.description : this.description;
	this.tags = newBook.tags ? newBook.tags : this.tags;
	return this.save();
}
