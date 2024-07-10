import React, { useState } from 'react';
import TextInput from '../../../Components/Form/TextInput';
import PasswordInput from '../../../Components/Form/PasswordInput';
import EmailInput from '../../../Components/Form/EmailInput';
import SignUpButton from './SignUpButton';
import { validateForm } from './validateForm';
import useApi from '../../../Context/AxiosContext';
import { useNavigate } from 'react-router-dom';
function SignUpForm({ isLoading, setIsLoading }) {
	const [firstName, setFirstName] = useState('');
	const [firstNameError, setFirstNameError] = useState('');
	const [lastName, setLastName] = useState();
	const [lastNameError, setLastNameError] = useState();
	const [email, setEmail] = useState();
	const [emailError, setEmailError] = useState();
	const [password, setPassword] = useState();
	const [passwordError, setPasswordError] = useState();
	const [repassword, setRePassword] = useState();
	const [repasswordError, setRePasswordError] = useState();
	const navigate = useNavigate();
	const api = useApi();

	const resetErrors = () => {
		setFirstNameError('');
		setLastNameError('');
		setEmailError('');
		setPasswordError('');
		setRePasswordError('');
	};
	const manageSubmit = async () => {
		setIsLoading(true);
		resetErrors();
		const formData = {
			firstName,
			lastName,
			email,
			password,
			repassword,
		};

		const validationResult = validateForm(formData);
		const currentTime = new Date().toLocaleString();

		if (!validationResult.isValid) {
			for (const key in validationResult.errors) {
				// adding time, for dependance array to change for useeffect to run
				const errorString = `${currentTime}: ${validationResult.errors[key]}`;
				if (key == 'firstName') setFirstNameError(errorString);
				if (key == 'lastName') setLastNameError(errorString);
				if (key == 'email') setEmailError(errorString);
				if (key == 'password') setPasswordError(errorString);
				if (key == 'repassword') setRePasswordError(errorString);
			}
			setIsLoading(false);
			return;
		}

		// Send data to server, POST
		try {
			const response = await api.post('api/users/signup/', {
				first_name: firstName,
				last_name: lastName,
				email: email,
				password: password,
			});
			setIsLoading(false);
			// console.log(response.statusText);
			if (response.statusText === 'Created') {
				navigate('/verify/', { state: { email } });
			}
		} catch (error) {
			// console.log('Error during signup:', error);
			// Handle error during signup (e.g., display error message)
			if (error.response) {
				const serverErrors = error.response.data;
				for (const key in serverErrors) {
					const errorString = `${currentTime}: ${serverErrors[
						key
					].join(', ')}`;
					if (key === 'firstName') setFirstNameError(errorString);
					if (key === 'lastName') setLastNameError(errorString);
					if (key === 'email') setEmailError(errorString);
					if (key === 'password') setPasswordError(errorString);
					if (key === 'repassword') setRePasswordError(errorString);
				}
			}
			setIsLoading(false);
		}
	};
	return (
		<div>
			<TextInput
				label='First name'
				placeholder='First name'
				getValue={setFirstName}
				key={1}
				errorMessage={firstNameError}
			/>
			<TextInput
				label='Last name'
				placeholder='Last name'
				getValue={setLastName}
				key={2}
				errorMessage={lastNameError}
			/>
			<EmailInput getValue={setEmail} errorMessage={emailError} />
			<div>
				<PasswordInput
					label='Password'
					getValue={setPassword}
					key={1}
					errorMessage={passwordError}
				/>
				<PasswordInput
					label='Re enter password'
					getValue={setRePassword}
					key={2}
					errorMessage={repasswordError}
				/>
			</div>
			<div className=' flex flex-col justify-center '>
				<SignUpButton onClick={manageSubmit} isBtnLoading={isLoading} />
			</div>
		</div>
	);
}

export default SignUpForm;
