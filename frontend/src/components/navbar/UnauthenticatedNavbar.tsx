import React from 'react';
import { Link } from 'react-router-dom';

const UnauthenticatedNavbar = () => {
	return (
		<div
			className={
				'bg-emerald-600 w-screen px-5 md:px-20 py-5 fixed text-white flex justify-between items-center z-10'
			}
		>
			<Link className={'text-2xl font-extrabold'} to={'/'}>
				Bookstore
			</Link>
			<div className={'text-lg flex gap-5'}>
				<Link to={'/'}>Books</Link>
				<Link to={'/login'}>Login</Link>
				<Link to={'/signup'}>Signup</Link>
			</div>
		</div>
	);
};

export default UnauthenticatedNavbar;
