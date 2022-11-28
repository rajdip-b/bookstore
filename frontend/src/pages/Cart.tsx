import React from 'react';
import PageWrapper from '../components/common/PageWrapper';
import useAuthorizedHttp from '../hooks/useAuthorizedHttp';
import { ICart } from '../index.types';
import useHttp from '../hooks/useHttp';
import CartItem from '../components/books/CartItem';

const Cart: React.FC = () => {
	const [cart, setCart] = React.useState<ICart[]>([]);
	const makeAuthorizedRequest = useAuthorizedHttp();
	const makeRequest = useHttp();

	const handleRemoveItem = React.useCallback((bookId: string) => {
		setCart((prev) => prev.filter((item) => item.book._id !== bookId));
	}, []);

	React.useEffect(() => {
		makeAuthorizedRequest({
			url: '/user/cart',
		}).then((data) => {
			data.data.forEach((b: Partial<ICart>) => {
				makeRequest({
					url: `/book/${b.bookId}`,
				}).then((data) => {
					setCart((prev) => [...prev, { book: data.data, quantity: b.quantity! }]);
				});
			});
		});
	}, [makeAuthorizedRequest]);

	return (
		<PageWrapper>
			<div className={'text-2xl font-bold text-gray-700 mb-5'}>View your cart</div>
			{cart.length === 0 && <div className={'text-xl text-gray-600'}>Your cart is empty</div>}
			<div className={'flex flex-col gap-5 pb-5'}>
				{cart.map((c, i) => (
					<CartItem onRemove={handleRemoveItem} item={c} key={i} />
				))}
			</div>
		</PageWrapper>
	);
};

export default Cart;
