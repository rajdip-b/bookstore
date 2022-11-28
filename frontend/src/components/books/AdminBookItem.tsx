import React, { FC } from 'react';
import { IBook } from '../../index.types';
import BookTag from './BookTag';
import { useNavigate } from 'react-router-dom';

const AdminBookItem: FC<{ book: IBook; index: number; onDelete?: (id: string) => void }> = ({
	book,
	index,
	onDelete,
}) => {
	const navigate = useNavigate();

	const handleEdit = React.useCallback(() => {
		navigate(`/admin/edit/${book._id}`);
	}, [navigate]);

	return (
		<div className={'flex gap-5 px-4 py-2 w-full'}>
			<div className={'px-5 text-center w-1/12'}>{index}</div>
			<div className={'w-3/12 pr-5 text-center'}>{book.name ? book.name : 'NIL'}</div>
			<div className={'w-2/12 pr-5 text-center'}>{book.author ? book.author : 'NIL'}</div>
			<div className={'w-1/12 pr-5 text-center'}>{book.price ? book.price : 'NIL'}</div>
			<div className={'w-3/12 pr-5 flex gap-3 overflow-x-scroll'}>
				{book.tags && book.tags.length !== 0
					? book.tags.map((t, i) => <BookTag key={i} name={t} color={'green'} />)
					: 'NIL'}
			</div>
			<button onClick={handleEdit} className={'w-1/12 pr-5 text-center text-sky-500'}>
				Edit
			</button>
			<button onClick={() => onDelete && onDelete(book._id!)} className={'w-1/12 pr-5 text-center text-red-500'}>
				Delete
			</button>
		</div>
	);
};

export default AdminBookItem;
