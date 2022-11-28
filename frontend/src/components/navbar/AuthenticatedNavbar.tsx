import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreState } from '../../store/store';
import { appActions } from '../../store/app-slice';

const AuthenticatedNavbar = () => {
	const user = useSelector((state: IStoreState) => state.app);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = React.useCallback(() => {
		alert('Logged out successfully');
		dispatch(appActions.logout());
		navigate('/');
	}, [dispatch]);

	return (
		<div
			className={
				'bg-emerald-600 w-screen px-5 md:px-20 py-5 fixed text-white flex justify-between items-center z-10'
			}
		>
			<Link className={'text-2xl font-extrabold'} to={'/'}>
				Welcome {user.name?.split(' ')[0]}
			</Link>
			<div className={'text-lg flex gap-5'}>
				<Link to={'/'}>Books</Link>
				{user.isAdmin && <Link to={'/admin'}>Admin</Link>}
				<Link to={'/cart'}>Cart</Link>
				<button onClick={handleLogout}>Logout</button>
			</div>
		</div>
	);
};

export default AuthenticatedNavbar;
