import React from 'react';
import PageWrapper from '../components/common/PageWrapper';
import BookItem from '../components/books/BookItem';
import useHttp from '../hooks/useHttp';
import { IBook } from '../index.types';

const Books = () => {
	const makeRequest = useHttp();
	const [books, setBooks] = React.useState<IBook[]>([]);

	React.useEffect(() => {
		makeRequest({
			url: '/book/all/',
		}).then((data: any) => setBooks(data.data));
	}, [makeRequest]);

	return (
		<PageWrapper>
			<div className={'text-2xl font-bold text-center text-gray-700'}>Browse your favourite book</div>
			<div className={'grid lg:grid-cols-2 grid-cols-1 w-full gap-8 py-10'}>
				{books.map((book) => (
					<BookItem key={book._id} book={book} />
				))}
				{books.length === 0 && (
					<div className={'col-span-3 text-center text-2xl font-light text-gray-600'}>
						Looks like the store is empty. Check again later!
					</div>
				)}
			</div>
		</PageWrapper>
	);
};

export default Books;
