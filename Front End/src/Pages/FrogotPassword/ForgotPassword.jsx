import React, { useState } from 'react';
import SignUpButton from '../Signup/Components/SignUpButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import Toast from '../../Components/Models/Toast';

function ForgotPassword() {
	const [error, setError] = useState('');
	const [showToast, setShowToast] = useState(false);
	const navigate = useNavigate();
	const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

	const mutation = useMutation({
		mutationFn: async (email) => {
			await axios.post(`${baseUrl}/api/users/password-reset-request/`, {
				email,
			});
		},
		onSuccess: () => {
			setShowToast(true);
			setTimeout(() => navigate('/login/'), 3000);
		},
		onError: (error) => {
			setError(error.response.data.detail);
		},
	});

	const manageSubmit = (e) => {
		e.preventDefault();
		setError('');
		const email = e.target.email.value;
		mutation.mutate(email);
	};

	return (
		<div className='md:flex items-center justify-center md:max-w-[85%] mx-auto py-12 px-4 sm:px-6 lg:px-8'>
			<div className='flex-1 flex justify-center items-center w-full'>
				<img
					src='/QuickbidsAd.png'
					alt=''
					className='max-w-full h-auto object-cover shadow-lg rounded-lg'
				/>
			</div>
			<div className='flex-1 flex justify-center items-center md:mt-0 mt-8 w-full'>
				<div className='shadow-lg rounded-lg p-6 sm:p-8 lg:p-10 bg-white w-full max-w-md'>
					<h1 className='text-center text-3xl font-bold mb-6 text-gray-800'>
						Reset Your Password
					</h1>
					<p className='text-center text-gray-600 mb-6'>
						We will send you a reset link to the registered email.
					</p>

					<form onSubmit={manageSubmit} className='space-y-6'>
						<div>
							<label
								htmlFor='email'
								className='block mb-2 text-sm font-medium text-gray-700'>
								Email address
							</label>
							<input
								type='email'
								id='email'
								name='email'
								className='w-full bg-gray-100 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 text-gray-700 placeholder-gray-400'
								placeholder='john.doe@company.com'
								required
							/>
						</div>
						<div className='flex justify-center'>
							<SignUpButton
								isBtnLoading={mutation.isLoading}
								text='Get Link'
								type='submit'
								disabled={mutation.isLoading}
								className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 transition-all duration-300'
							/>
						</div>
						<span className='block text-center text-xs text-red-600'>
							{error ? error : ''}
						</span>
						<div className='text-center mt-4'>
							<span className='text-gray-600'>
								Or{' '}
								<span
									className='cursor-pointer text-blue-600 underline hover:text-blue-800 transition-all duration-300'
									onClick={() => navigate('/login/')}>
									sign in
								</span>{' '}
								here
							</span>
						</div>
					</form>
				</div>
			</div>
			{showToast && (
				<Toast
					message='Password reset email sent successfully!'
					type='success'
					onClose={() => setShowToast(false)}
				/>
			)}
		</div>
	);
}

export default ForgotPassword;
