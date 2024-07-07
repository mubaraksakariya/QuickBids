import React, { useState } from 'react';
import TextInput from '../../../Components/Form/TextInput';
import PasswordInput from '../../../Components/Form/PasswordInput';
import EmailInput from '../../../Components/Form/EmailInput';
import SignUpButton from './SignUpButton';
import { validateForm } from './validateForm';
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
	const resetErrors = () => {
		setFirstNameError('');
		setLastNameError('');
		setEmailError('');
		setPasswordError('');
		setRePasswordError('');
	};
	const manageSubmit = () => {
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
			for (const error in validationResult.errors) {
				// adding time, for dependance array to change for useeffect to run
				const errorString = `${currentTime}: ${validationResult.errors[error]}`;
				if (error == 'firstName') setFirstNameError(errorString);
				if (error == 'lastName') setLastNameError(errorString);
				if (error == 'email') setEmailError(errorString);
				if (error == 'password') setPasswordError(errorString);
				if (error == 'repassword') setRePasswordError(errorString);
			}
			return;
		}
		console.log(formData);
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
