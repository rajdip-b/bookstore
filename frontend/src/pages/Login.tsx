import React from 'react';
import PageWrapper from '../components/common/PageWrapper';
import Input from '../components/ui/Input';
import GreenButton from '../components/ui/GreenButton';
import useHttp from '../hooks/useHttp';
import { useDispatch } from 'react-redux';
import { appActions } from '../store/app-slice';
import useAuthorizedHttp from '../hooks/useAuthorizedHttp';

const Login = () => {
	const [form, setForm] = React.useState({
		email: '',
		password: '',
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

	const handleLogin = React.useCallback(() => {
		if (!form.email || !form.password) {
			alert('Please fill all the fields');
			return;
		}
		makeRequest({
			url: '/auth/signin',
			method: 'post',
			body: form,
		})
			.then((data) => {
				const token = data.data.token;
				alert('Login successful');
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
					Log into your account
				</div>
				<div className={'flex flex-col gap-4 px-5'}>
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
				</div>
				<GreenButton onClick={handleLogin} className={'m-5'} filled>
					Log In
				</GreenButton>
			</div>
		</PageWrapper>
	);
};

export default Login;
