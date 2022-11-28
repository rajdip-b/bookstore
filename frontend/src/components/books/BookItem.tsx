import React, { FC } from 'react';
import BookTag from './BookTag';
import GreenButton from '../ui/GreenButton';
import { IBook } from '../../index.types';
import { useNavigate } from 'react-router-dom';

const BookItem: FC<{ book: IBook; previewMode?: boolean }> = ({ book, previewMode }) => {
	const navigate = useNavigate();
	const handleView = React.useCallback(() => {
		if (!previewMode) {
			navigate(`/${book._id}`);
		}
	}, [book]);

	return (
		<div
			style={{
				backgroundImage: `url(${
					book.imageUrl
						? book.imageUrl
						: 'https://www.kindpng.com/picc/m/725-7251301_book-cover-placeholder-hd-png-download.png'
				})`,
			}}
			className={'rounded-lg bg-no-repeat bg-cover group transition-all ease-out duration-300 shadow-xl'}
		>
			<div
				className={
					'flex gap-5 bg-gradient-to-br from-gray-600/60 to-gray-800/60 p-5 backdrop-blur-[8px] rounded-lg'
				}
			>
				<img
					alt={''}
					src={`${
						book.imageUrl
							? book.imageUrl
							: 'https://www.kindpng.com/picc/m/725-7251301_book-cover-placeholder-hd-png-download.png'
					}`}
					className={
						'object-cover sm:block hidden h-[300px] rounded-lg relative  group-hover:-translate-y-14 translate-y-0 transition-all ease-out duration-700'
					}
				/>
				<div className={'flex flex-col w-full text-white justify-between'}>
					<div className={'flex flex-col mb-5'}>
						<div className={'text-2xl font-bold text-white'}>
							{book.name ? book.name : 'No name provided'}
						</div>
						<div className={'text-lg font-bold'}>By {book.author ? book.author : 'Anonymous'}</div>
						<div className={'flex gap-3 overflow-scroll my-3 flex-wrap'}>
							{book.tags.map((t) => (
								<BookTag color={'white'} key={t} name={t} />
							))}
							{book.tags.length === 0 && <div>No tags provided</div>}
						</div>
						<div className={'font-'}>{book.description ? book.description : 'No description provided'}</div>
					</div>
					<div className={'flex justify-between'}>
						<div className={'text-3xl font-bold'}>{book.price ? book.price : '$0.00'}</div>
						<GreenButton onClick={handleView} filled>
							View
						</GreenButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookItem;
