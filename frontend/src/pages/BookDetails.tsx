import React from 'react';
import PageWrapper from '../components/common/PageWrapper';
import { useParams } from 'react-router-dom';
import { IBook } from '../index.types';
import useHttp from '../hooks/useHttp';
import BookTag from '../components/books/BookTag';
import GreenButton from '../components/ui/GreenButton';
import useAuthorizedHttp from '../hooks/useAuthorizedHttp';

const BookDetails = () => {
	const { bookId } = useParams();
	const [book, setBook] = React.useState<IBook | null>(null);
	const makeRequest = useHttp();
	const makeAuthorizedRequest = useAuthorizedHttp();

	const handleAddToCart = React.useCallback(() => {
		makeAuthorizedRequest({
			url: `/user/cart/${bookId}`,
			method: 'put',
		})
			.then(() => alert('Added to cart'))
			.catch((err) => console.log(err));
	}, [bookId]);

	React.useEffect(() => {
		makeRequest({
			url: `/book/${bookId}`,
		}).then((data) => {
			setBook(data.data);
		});
	}, [bookId]);

	return (
		<PageWrapper>
			{book && (
				<div className={'w-full flex gap-10'}>
					<div className={'w-1/3 bg-cover rounded-lg'}>
						<img
							alt={'Book Image'}
							className={'h-[80vh] rounded-xl mx-auto shadow-2xl'}
							src={book.imageUrl}
						/>
					</div>
					<div className={'w-2/3 flex flex-col justify-between'}>
						<div className={'flex flex-col'}>
							<div className={'text-3xl font-medium text-gray-700'}>
								{book.name ? book.name : 'No name provided'}
							</div>
							<div className={'text-xl mt-2 text-gray-600'}>
								A book by {book.author ? book.author : 'Anonymous'}
							</div>
							<div className={'mt-5 text-gray-600 text-lg border-b mb-2'}>Description</div>
							<div className={'text-lg text-gray-800'}>
								{book.description ? book.description : 'No description provided'}
							</div>
							<div className={'mt-5 text-gray-600 text-lg border-b mb-2'}>Tags</div>
							<div className={'flex gap-3'}>
								{book.tags
									? book.tags.map((t, i) => <BookTag name={t} key={i} color={'green'} />)
									: 'No tags provided'}
							</div>
							<div className={'mt-5 text-gray-600 text-lg border-b mb-2'}>Price</div>
							<div className={'text-2xl font-bold text-gray-800'}>
								{book.price ? book.price : 'No price provided'}
							</div>
						</div>
						<div className={'flex gap-3 place-self-end'}>
							<GreenButton onClick={handleAddToCart}>Add To Cart</GreenButton>
							<GreenButton filled>Buy Now</GreenButton>
						</div>
					</div>
				</div>
			)}
		</PageWrapper>
	);
};

export default BookDetails;
