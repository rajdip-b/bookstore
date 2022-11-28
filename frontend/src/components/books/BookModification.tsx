import React, { FC } from 'react';
import { IBook } from '../../index.types';
import useAuthorizedHttp from '../../hooks/useAuthorizedHttp';
import Input from '../ui/Input';
import GreenButton from '../ui/GreenButton';
import BookTag from './BookTag';
import BookItem from './BookItem';

const BookModification: FC<{ b: IBook; editMode?: boolean }> = ({ b, editMode }) => {
	const [book, setBook] = React.useState<IBook>(b);
	const [tag, setTag] = React.useState('');
	const makeAuthorizedRequest = useAuthorizedHttp();

	const handleAddTag = React.useCallback(() => {
		setBook((prev) => ({
			...prev,
			tags: [...prev.tags, tag],
		}));
		setTag('');
	}, [tag]);

	const handleInputChange = React.useCallback((e: HTMLInputElement | HTMLTextAreaElement) => {
		setBook((prev) => ({
			...prev,
			[e.name]: e.value,
		}));
	}, []);

	const handleRemoveTag = React.useCallback(
		(name: string) =>
			setBook((prev) => ({
				...prev,
				tags: prev.tags.filter((t) => t !== name),
			})),
		[]
	);

	const handleAddBook = React.useCallback(() => {
		makeAuthorizedRequest({
			url: '/book/',
			method: 'post',
			body: book,
		})
			.then(() => {
				!editMode && setBook(b);
				setTag('');
				alert('Book created');
			})
			.catch((err) => {
				alert('Error saving book. Check logs');
				console.log(err);
			});
	}, [book]);

	const handleEditBook = React.useCallback(() => {
		makeAuthorizedRequest({
			url: '/book/',
			method: 'put',
			body: book,
		})
			.then(() => {
				!editMode && setBook(b);
				setTag('');
				alert('Book edited');
			})
			.catch((err) => {
				alert('Error saving book. Check logs');
				console.log(err);
			});
	}, [book]);

	React.useEffect(() => {
		editMode && setBook(b);
	}, [editMode, b]);

	return (
		<>
			<div className={'font-bold text-2xl text-gray-700 mb-10'}>
				{editMode ? 'Edit details' : 'Add a new book'}
			</div>
			<div className={'flex gap-10 max-h-screen'}>
				<div className={'flex flex-col gap-3 w-1/2'}>
					<Input
						title={'Enter book name*'}
						type={'text'}
						name={'name'}
						placeholder={'A fancy book'}
						value={book.name}
						onChange={handleInputChange}
					/>
					<Input
						title={'Enter book image link*'}
						type={'text'}
						name={'imageUrl'}
						value={book.imageUrl}
						placeholder={'https://cdn.google.com/kjnbrellas.png'}
						onChange={handleInputChange}
					/>
					<Input
						title={"Enter author's name*"}
						type={'text'}
						name={'author'}
						value={book.author}
						placeholder={'John Doe'}
						onChange={handleInputChange}
					/>
					<Input
						title={'Enter book price*'}
						type={'text'}
						name={'price'}
						placeholder={'$29.99'}
						value={book.price}
						onChange={handleInputChange}
					/>
					<Input
						title={'Enter book description'}
						type={'textarea'}
						name={'description'}
						value={book.description}
						placeholder={'A book of adventure'}
						onChange={handleInputChange}
					/>
					<div className={'flex gap-3'}>
						<Input
							onChange={(e) => setTag(e.value)}
							className={'w-4/5'}
							title={'Enter tag'}
							type={'text'}
							value={tag}
							placeholder={'Adventure'}
						/>
						<GreenButton onClick={handleAddTag} className={'w-1/5'} filled>
							Add tag
						</GreenButton>
					</div>
					<div className={'flex gap-3'}>
						{book.tags.length === 0 && <div className={'w-full text-sm text-gray-600'}>No tags added</div>}
						{book.tags.map((t, i) => (
							<BookTag onClick={handleRemoveTag} color={'green'} name={t} key={i} />
						))}
					</div>
					{editMode ? (
						<GreenButton onClick={handleEditBook} filled>
							Save changes
						</GreenButton>
					) : (
						<GreenButton onClick={handleAddBook} filled>
							Add book
						</GreenButton>
					)}
				</div>
				<div className={'w-1/2'}>
					<div className={'text-xl font-bold mb-5'}>Preview</div>
					<BookItem previewMode book={book} />
				</div>
			</div>
		</>
	);
};

export default BookModification;
