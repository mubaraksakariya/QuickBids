import React, { useState } from 'react';
import EmailInput from '../../../Components/Form/EmailInput';
import PasswordInput from '../../../Components/Form/PasswordInput';
import SignUpButton from '../../Signup/Components/SignUpButton';
import { validateLoginForm } from './validateLoginForm';
import useApi from '../../../Context/AxiosContext';
import { useDispatch } from 'react-redux';
import { login } from '../../../Store/authSlice';

function LoginForm({ isLoading, setIsLoading }) {
	const [email, setEmail] = useState();
	const [emailError, setEmailError] = useState();
	const [password, setPassword] = useState();
	const [passwordError, setPasswordError] = useState();
	const [otherError, setOtherError] = useState();
	const api = useApi();
	const dispatch = useDispatch();

	const resetErrors = () => {
		setEmailError('');
		setPasswordError('');
		setOtherError('');
	};
	const manageSubmit = async () => {
		setIsLoading(true);
		resetErrors();
		const formData = {
			email,
			password,
		};
		const validationResult = validateLoginForm(formData);
		const currentTime = new Date().toLocaleString();
		if (!validationResult.isValid) {
			for (const key in validationResult.errors) {
				// adding time, for dependance array to change for useeffect to run
				const errorString = `${currentTime}: ${validationResult.errors[key]}`;
				if (key == 'email') setEmailError(errorString);
				// if (key == 'password') setPasswordError(errorString);
			}
			setIsLoading(false);
			return;
		}
		// Send data to server, POST
		try {
			const response = await api.post('users/login', {
				email: email,
				password: password,
			});
			setIsLoading(false);
			console.log(response.statusText);
			if (response.statusText === 'OK') {
				// navigate('/');
				console.log(response);
				const accessToken = response.data.access;
				const refreshToken = response.data.refresh;
				const user = {};
				dispatch(login({ accessToken, refreshToken, user }));
			}
		} catch (error) {
			console.log('Error during signin:', error);
			// Handle error during signin
			if (error.response) {
				const serverErrors = error.response.data;
				console.log(serverErrors);
				setOtherError(serverErrors.detail);
				// for (const key in serverErrors) {
				// 	const errorString = `${currentTime}: ${serverErrors[
				// 		key
				// 	].join(', ')}`;
				// 	if (key === 'email') setEmailError(errorString);
				// 	if (key === 'password') setPasswordError(errorString);
				// 	else setOtherError(errorString);
				// }
			}
			setIsLoading(false);
		}
	};
	return (
		<div className='relative pb-5'>
			<EmailInput getValue={setEmail} errorMessage={emailError} />
			<PasswordInput
				label='Password'
				getValue={setPassword}
				key={1}
				errorMessage={passwordError}
			/>
			<div className=' flex flex-col justify-center '>
				<SignUpButton
					onClick={manageSubmit}
					isBtnLoading={isLoading}
					text='Sign in'
				/>
			</div>
			<div className='absolute bottom-0 w-full flex justify-center'>
				<span className='text-xs text-errorColour'>{otherError}</span>
			</div>
		</div>
	);
}

export default LoginForm;
