import React from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from '../components/common/PageWrapper';
import { IBook } from '../index.types';
import BookModification from '../components/books/BookModification';
import useHttp from '../hooks/useHttp';

const EditBook: React.FC = () => {
	const { bookId } = useParams();
	const makeRequest = useHttp();
	const [book, setBook] = React.useState<IBook>({
		name: '',
		author: '',
		price: '',
		description: '',
		imageUrl: '',
		tags: [],
	});

	React.useEffect(() => {
		makeRequest({
			url: `/book/${bookId}`,
		}).then((data) => {
			setBook(data.data);
		});
	}, [bookId]);

	return (
		<PageWrapper>
			<BookModification b={book} editMode />
		</PageWrapper>
	);
};

export default EditBook;
