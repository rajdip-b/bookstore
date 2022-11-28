export interface IBook {
	_id?: string;
	name: string;
	author: string;
	price: string;
	description: string;
	tags: string[];
	imageUrl: string;
}

export interface ICart {
	bookId?: string;
	book: IBook;
	quantity: number;
}
