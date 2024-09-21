import React, { useState } from 'react';
import useApi from '../../../Context/AxiosContext';
import { validateAdminLogin } from './Component/validateAdminLogin';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../Store/authSlice';
import { Navigate, useLocation } from 'react-router-dom';

const AdminLogin = () => {
	const [email, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [usernameError, setUsernameError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [otherError, setOtherError] = useState('');
	const dispatch = useDispatch();
	const api = useApi();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const isAdmin = useSelector((state) => state.auth.isAdmin);
	const location = useLocation();
	const from = location.state?.from || '/admin/';

	console.log('login');

	if (isAuthenticated && isAdmin) {
		return <Navigate to={from} replace={true} />;
	}

	const resetErrors = () => {
		setUsernameError('');
		setPasswordError('');
		setOtherError('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		resetErrors();

		const formData = { email, password };
		const validationResult = validateAdminLogin(formData);

		if (!validationResult.isValid) {
			// Set the appropriate errors
			if (validationResult.errors.email) {
				setUsernameError(validationResult.errors.email);
			}
			if (validationResult.errors.password) {
				setPasswordError(validationResult.errors.password);
			}
			return;
		}

		try {
			let response = await api.post('api/admin/login/', formData);

			// Assuming the response has a status indicating success
			if (response.statusText === 'OK') {
				// Handle successful login (e.g., redirect, save tokens, etc.)
				const accessToken = response.data.access;
				const refreshToken = response.data.refresh;
				const user = false;
				dispatch(
					login({ accessToken, refreshToken, user, isAdmin: true })
				);
			}
		} catch (error) {
			// Handle login failure
			if (error.response?.data?.detail) {
				setOtherError(error.response.data.detail);
			} else {
				setOtherError('An error occurred. Please try again.');
			}
		}
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen min-w-full bg-mainBgColour'>
			<div className='bg-cardBgColour border border-cardBorderColour p-8 rounded-lg shadow-lg w-full max-w-md'>
				<h1 className='text-3xl font-bold text-headerColour mb-6 text-center'>
					Admin Login
				</h1>
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label
							htmlFor='email'
							className='block text-bodyTextColour font-semibold mb-2'>
							email
						</label>
						<input
							type='text'
							id='email'
							value={email}
							onChange={(e) => setUsername(e.target.value)}
							required
							className='w-full p-3 border border-cardBorderColour rounded bg-sectionBgColour2 text-bodyTextColour'
						/>
						{usernameError && (
							<span className='text-xs text-errorColour'>
								{usernameError}
							</span>
						)}
					</div>
					<div className='mb-6'>
						<label
							htmlFor='password'
							className='block text-bodyTextColour font-semibold mb-2'>
							Password
						</label>
						<input
							type='password'
							id='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className='w-full p-3 border border-cardBorderColour rounded bg-sectionBgColour2 text-bodyTextColour'
						/>
						{passwordError && (
							<span className='text-xs text-errorColour'>
								{passwordError}
							</span>
						)}
					</div>
					<button
						type='submit'
						className='w-full p-3 bg-buttonColour1 text-white font-semibold rounded hover:bg-buttonColour2 transition-colors'>
						Login
					</button>
					{otherError && (
						<div className='mt-4 text-xs text-errorColour text-center'>
							{otherError}
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default AdminLogin;
