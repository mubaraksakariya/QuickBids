import React, { useState } from 'react';
import TextInput from './TextInput';
import ThemeButtons from '../../../Components/Buttons/ThemeButton';
import ErrorModal from '../../../Components/Models/ErrorModal';
import GeneralModal from '../../../Components/Models/GeneralModal';
import useChangePassword from '../../../CustomHooks/useChangePassword';
import RequestPasswordReset from '../../../Components/Profile/RequestPasswordReset';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../Store/authSlice';
import { useNavigate } from 'react-router-dom';

const PasswordChange = () => {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const user = useSelector((state) => state.auth.user);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { mutate: updatePassword } = useChangePassword();

	const handleSubmit = () => {
		if ((newPassword == '') | (newPassword.length < 8)) {
			setError('Enter a password atleast of length of 8..!');
			return;
		}
		if (newPassword !== confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		setIsSubmitting(true);
		updatePassword(
			{ old_password: currentPassword, new_password: newPassword },
			{
				onSuccess: () => {
					setIsSubmitting(false);
					setIsSuccess(true);
					setCurrentPassword('');
					setNewPassword('');
					setConfirmPassword('');
				},
				onError: (error) => {
					console.error('Error updating password:', error);
					console.log(error);
					setError(error.message);
					setIsSubmitting(false);
				},
			}
		);
	};

	return (
		<div className='max-w-[50%]'>
			{user.auth_provider == 'local' ? (
				<>
					<h2 className='text-xl font-semibold mb-4'>
						Change Password
					</h2>
					<TextInput
						required={true}
						label='Current Password'
						type='password'
						value={currentPassword}
						onChange={(e) => setCurrentPassword(e.target.value)}
						placeholder='Enter your current password'
					/>
					<TextInput
						required={true}
						label='New Password'
						type='password'
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						placeholder='Enter your new password'
					/>
					<TextInput
						required={true}
						label='Confirm New Password'
						type='password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder='Confirm your new password'
					/>
					<div className='mb-6'>
						<ThemeButtons
							text={
								isSubmitting ? 'Updating...' : 'Update Password'
							}
							style={1}
							onclick={handleSubmit}
							disabled={isSubmitting}
						/>
					</div>
				</>
			) : (
				<div>
					<div className=' mb-4'>
						<h2 className='text-xl font-semibold'>
							Change Password
						</h2>
						<p className=''>
							You are logged in with{' '}
							<span className=' underline'>
								{user.auth_provider}
							</span>{' '}
							auth,
						</p>
						<p>we will email you a password reset link</p>
					</div>
					<RequestPasswordReset />
				</div>
			)}
			{error && (
				<ErrorModal
					message={error}
					onClose={() => setError(null)}
					title='Password Change Error'
				/>
			)}
			<GeneralModal
				show={isSuccess}
				onClose={() => {
					setIsSuccess(false);
					dispatch(logout());
					navigate('/login/');
				}}>
				<div>
					<div className='flex justify-center pb-4'>
						<h1 className='text-2xl'>Success !!!</h1>
					</div>
					<p>Your password has been updated successfully</p>
				</div>
			</GeneralModal>
		</div>
	);
};

export default PasswordChange;
