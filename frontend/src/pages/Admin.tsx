import React from 'react';
import PageWrapper from '../components/common/PageWrapper';
import GreenButton from '../components/ui/GreenButton';
import { IBook } from '../index.types';
import { useNavigate } from 'react-router-dom';
import useHttp from '../hooks/useHttp';
import AdminBookItem from '../components/books/AdminBookItem';
import useAuthorizedHttp from '../hooks/useAuthorizedHttp';

const Admin: React.FC = () => {
	const [books, setBooks] = React.useState<IBook[]>([]);
	const navigate = useNavigate();
	const makeRequest = useHttp();
	const makeAuthorizedRequest = useAuthorizedHttp();

	const handleCreateBook = React.useCallback(() => navigate('/admin/create'), [navigate]);

	const handleDelete = React.useCallback((id: string) => {
		makeAuthorizedRequest({
			url: `/book/${id}`,
			method: 'delete',
		})
			.then((data) => {
				setBooks((prev) => prev.filter((b) => b._id !== id));
				alert('Book deleted successfully!');
			})
			.catch((err) => console.log(err));
	}, []);

	React.useEffect(() => {
		makeRequest({
			url: '/book/all/',
		}).then((data: any) => setBooks(data.data));
	}, [makeRequest]);

	return (
		<PageWrapper>
			<div className={'flex w-full justify-between items-center'}>
				<div className={'font-bold text-2xl text-gray-700'}>View and manage the books</div>
				<GreenButton onClick={handleCreateBook} filled>
					Add a book
				</GreenButton>
			</div>
			<div className={'flex flex-col w-full mt-5 border-emerald-500 border-2 rounded-lg border-t-0 pb-2'}>
				<div className={'flex gap-5 bg-emerald-500 text-white px-4 py-2 w-full rounded-t-lg'}>
					<div className={'border-x-2 border-x-gray-100 px-5 text-center w-1/12'}>Index</div>
					<div className={'w-3/12 border-r-2 border-r-gray-100 pr-5 text-center'}>Name</div>
					<div className={'w-2/12 border-r-2 border-r-gray-100 pr-5 text-center'}>Author</div>
					<div className={'w-1/12 border-r-2 border-r-gray-100 pr-5 text-center'}>Price</div>
					<div className={'w-3/12 border-r-2 border-r-gray-100 pr-5 text-center'}>Tags</div>
					<div className={'w-2/12 border-r-2 border-r-gray-100 pr-5 text-center'}>Actions</div>
				</div>
				{books.length === 0 && (
					<div className={'flex justify-center items-center w-full h-20 text-gray-500'}>
						No books found. Create one to begin.
					</div>
				)}
				{books.map((b, i) => (
					<AdminBookItem onDelete={handleDelete} book={b} index={i} key={b._id} />
				))}
			</div>
		</PageWrapper>
	);
};

export default Admin;
