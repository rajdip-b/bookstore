import { FC, ReactNode } from 'react';
import UnauthenticatedNavbar from '../navbar/UnauthenticatedNavbar';
import { useSelector } from 'react-redux';
import { IStoreState } from '../../store/store';
import AuthenticatedNavbar from '../navbar/AuthenticatedNavbar';

const PageWrapper: FC<{ children?: ReactNode; className?: string }> = (props) => {
	const isLoggedIn = useSelector((state: IStoreState) => state.app.isLoggedIn);

	return (
		<div className='w-screen overflow-y-scroll flex flex-col nunito'>
			{isLoggedIn ? <AuthenticatedNavbar /> : <UnauthenticatedNavbar />}
			<div className={`pt-[110px] px-5 md:px-20 mx-auto flex flex-col h-[100vh] w-full ${props.className}`}>
				{props.children}
			</div>
		</div>
	);
};

export default PageWrapper;
