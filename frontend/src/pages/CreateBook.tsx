import React from 'react';
import { IBook } from '../index.types';
import BookModification from '../components/books/BookModification';
import PageWrapper from '../components/common/PageWrapper';

const CreateBook: React.FC = () => {
	const initialState: IBook = {
		name: '',
		author: '',
		price: '',
		description: '',
		imageUrl: '',
		tags: [],
	};

	return (
		<PageWrapper>
			<BookModification b={initialState} />
		</PageWrapper>
	);
};

export default CreateBook;
