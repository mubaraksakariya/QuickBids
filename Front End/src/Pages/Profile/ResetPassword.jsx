import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const location = useLocation();
	const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
	const navigate = useNavigate();

	const query = new URLSearchParams(location.search);
	const uid = query.get('uid');
	const token = query.get('token');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		if (!newPassword | !confirmPassword | (newPassword.length < 8)) {
			setError('The passwoed must be atleast 8 char long');
			return;
		}
		if (newPassword !== confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		try {
			await axios.post(`${baseUrl}/api/users/reset-password/`, {
				uid,
				token,
				new_password: newPassword,
			});
			setSuccess(
				'Password has been reset successfully. You can now log in with your new password.'
			);
			setTimeout(() => navigate('/login/'), 5000); // Redirect after 5 seconds
		} catch (err) {
			if (err?.response?.data?.error)
				setError(
					`Failed to reset password!!  ${err?.response?.data?.error} Please try again`
				);
			else {
				setError(`Failed to reset password!! Please try again`);
			}
			console.log(err.response.data.error);
		}
	};

	return (
		<div className='full-page'>
			<div className='flex flex-col items-center justify-center min-h-screen bg-mainBgColour'>
				<h2 className='text-2xl font-bold mb-4 text-headerColour'>
					Reset Password
				</h2>
				{error && <p className='text-errorColour'>{error}</p>}
				{success && <p className='text-button2Colour1'>{success}</p>}
				<form onSubmit={handleSubmit} className='w-full max-w-sm'>
					<div className='mb-4'>
						<label className='block text-bodyTextColour'>
							New Password
						</label>
						<input
							type='password'
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							required
							className='border border-cardBorderColour rounded py-2 px-3 w-full bg-cardBgColour text-bodyTextColour'
						/>
					</div>
					<div className='mb-4'>
						<label className='block text-bodyTextColour'>
							Confirm New Password
						</label>
						<input
							type='password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							className='border border-cardBorderColour rounded py-2 px-3 w-full bg-cardBgColour text-bodyTextColour'
						/>
					</div>
					<button
						type='submit'
						className='bg-buttonColour1 text-white py-2 px-4 rounded hover:bg-buttonColour2 transition-colors duration-300 ease-in-out'>
						Reset Password
					</button>
				</form>
			</div>
		</div>
	);
};

export default ResetPassword;
