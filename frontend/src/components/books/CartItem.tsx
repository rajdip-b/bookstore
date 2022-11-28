import React, { FC } from 'react';
import { ICart } from '../../index.types';
import { Link } from 'react-router-dom';
import useAuthorizedHttp from '../../hooks/useAuthorizedHttp';

const CartItem: FC<{ item: ICart; onRemove: (bookId: string) => void }> = ({ item, onRemove }) => {
	const [quantity, setQuantity] = React.useState(item.quantity);
	const makeAuthorizedRequest = useAuthorizedHttp();

	const handleIncreaseQuantity = React.useCallback(() => {
		makeAuthorizedRequest({
			url: `/user/cart/${item.book._id}`,
			method: 'put',
		}).then(() => setQuantity((prev) => prev + 1));
	}, [item]);

	const handleDecreaseQuantity = React.useCallback(() => {
		makeAuthorizedRequest({
			url: `/user/cart/${item.book._id}`,
			method: 'delete',
		}).then(() => {
			if (quantity === 1) onRemove(item.book._id!);
			setQuantity((prev) => prev - 1);
		});
	}, [item, quantity]);

	return (
		<div className={'rounded-lg border-2 p-3 flex gap-5'}>
			<img className={'h-[150px] rounded-lg'} alt={''} src={item.book.imageUrl} />
			<div className={'flex flex-col gap-3 flex-grow'}>
				<Link to={`/${item.book._id}`} className={'text-sky-500 text-2xl font-bold'}>
					{item.book.name}
				</Link>
				<div>{item.book.description}</div>
				<div className={'text-3xl font-medium'}>{item.book.price}</div>
			</div>
			<div className={'flex items-center '}>
				<button onClick={handleDecreaseQuantity} className={'rounded-l-lg bg-sky-500 py-2 px-4 text-white'}>
					-
				</button>
				<div className={'bg-gray-200 p-2'}>{quantity}</div>
				<button onClick={handleIncreaseQuantity} className={'rounded-r-lg bg-sky-500 py-2 px-4 text-white'}>
					+
				</button>
			</div>
		</div>
	);
};

export default CartItem;
