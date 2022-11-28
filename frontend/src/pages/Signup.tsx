import React from 'react';
import PageWrapper from '../components/common/PageWrapper';
import Input from '../components/ui/Input';
import GreenButton from '../components/ui/GreenButton';
import useHttp from '../hooks/useHttp';
import { useDispatch } from 'react-redux';
import { appActions } from '../store/app-slice';
import useAuthorizedHttp from '../hooks/useAuthorizedHttp';

const Signup = () => {
	const [form, setForm] = React.useState({
		name: '',
		email: '',
		password: '',
		cPassword: '',
		isAdmin: false,
	});
	const makeRequest = useHttp();
	const makeAuthorizedRequest = useAuthorizedHttp();
	const dispatch = useDispatch();

	const handleInputChange = React.useCallback((e: HTMLInputElement | HTMLTextAreaElement) => {
		setForm((prev) => ({
			...prev,
			[e.name]: e.value,
		}));
	}, []);

	const handleSignup = React.useCallback(() => {
		if (!form.email || !form.password || !form.cPassword || !form.name) {
			alert('Please fill all the fields');
			return;
		}
		if (form.cPassword !== form.password) {
			alert('Password and confirm password do not match');
			return;
		}
		makeRequest({
			url: '/auth/signup',
			method: 'post',
			body: form,
		})
			.then((data) => {
				const token = data.data.token;
				alert('Signup successful');
				dispatch(appActions.login(token));
				makeAuthorizedRequest({
					url: '/user/',
					token,
				}).then((data) => {
					console.log(data.data);
					dispatch(appActions.updateUser(data.data));
				});
			})
			.catch((err) => alert(err.response.data.error));
	}, [form]);

	return (
		<PageWrapper className={'justify-center'}>
			<div
				className={
					'bg-white shadow-2xl rounded-lg flex flex-col w-fit w-[90vw] md:w-[50vw] lg:w-[25vw] mx-auto'
				}
			>
				<div className={'bg-emerald-600 font-bold text-2xl text-white p-5 rounded-t-xl mb-5'}>
					Create a new account
				</div>
				<div className={'flex flex-col gap-4 px-5'}>
					<Input
						onChange={handleInputChange}
						type={'text'}
						className={'w-full'}
						placeholder={'John Doe'}
						name={'name'}
						title={'Enter your name'}
					/>
					<Input
						onChange={handleInputChange}
						type={'email'}
						className={'w-full'}
						placeholder={'johndoe@gmail.com'}
						name={'email'}
						title={'Enter your email'}
					/>
					<Input
						onChange={handleInputChange}
						type={'password'}
						className={'w-full'}
						placeholder={'********'}
						name={'password'}
						title={'Enter your password'}
					/>
					<Input
						onChange={handleInputChange}
						type={'password'}
						className={'w-full'}
						placeholder={'********'}
						name={'cPassword'}
						title={'Re-enter your password'}
					/>
					<label className={'text-sm flex gap-2 items-center text-gray-800'}>
						<input
							className={'accent-emerald-600'}
							type={'checkbox'}
							onChange={(event: any) =>
								setForm((prev) => ({
									...prev,
									isAdmin: event.target.checked,
								}))
							}
						/>
						This is an admin account
					</label>
				</div>
				<GreenButton onClick={handleSignup} className={'m-5'} filled>
					Sign Up
				</GreenButton>
			</div>
		</PageWrapper>
	);
};

export default Signup;
