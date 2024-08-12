import React, { useState, useRef } from 'react';
import TextInput from './TextInput';
import ThemeButtons from '../../../Components/Buttons/ThemeButton';
import useUpdateUser from '../../../CustomHooks/useUpdateUser';
import { useSelector } from 'react-redux';
import { validateImageFile } from '../Utils/ProfileImageValidator';
import ProfilePicture from './ProfilePicture';
import ErrorModal from '../../../Components/Models/ErrorModal';
import GeneralModal from '../../../Components/Models/GeneralModal';

const BasicDetailsEdit = () => {
	const user = useSelector((state) => state.auth.user);
	const [firstName, setFirstName] = useState(user?.first_name || '');
	const [lastName, setLastName] = useState(user?.last_name || '');
	const [profilePicture, setProfilePicture] = useState(null);
	const [profilePictureError, setProfilePictureError] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const { mutate: updateUser } = useUpdateUser();
	const fileInputRef = useRef(null);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const { isValid, errorMessage } = validateImageFile(file);
			if (!isValid) {
				setProfilePictureError(errorMessage);
				fileInputRef.current.value = '';
				return;
			}
			setProfilePicture(file);
		}
	};
	const resetForm = () => {
		setFirstName('');
		setLastName('');
		setProfilePicture(null);
		fileInputRef.current.value = '';
	};
	const manageSubmit = () => {
		const formData = new FormData();
		let hasUpdates = false;

		if (firstName && firstName !== user?.first_name) {
			formData.append('first_name', firstName);
			hasUpdates = true;
		}
		if (lastName && lastName !== user?.last_name) {
			formData.append('last_name', lastName);
			hasUpdates = true;
		}
		if (profilePicture) {
			formData.append('profile_picture', profilePicture);
			hasUpdates = true;
		}

		if (hasUpdates) {
			setIsSubmitting(true);
			updateUser(formData, {
				onSuccess: () => {
					setIsSubmitting(false);
					setIsSuccess(true);
					resetForm();
				},
				onError: (error) => {
					console.error('Error updating user:', error);
					setIsSubmitting(false);
				},
			});
		} else {
			console.log('No changes to submit');
		}
	};

	return (
		<div className='max-w-[50%]'>
			<div className='flex flex-col gap-2 mb-4'>
				<label>Change Profile Picture</label>
				<input
					type='file'
					ref={fileInputRef}
					className='block'
					onChange={handleFileChange}
				/>
			</div>
			<ProfilePicture
				picture={profilePicture}
				onRemove={() => {
					setProfilePicture(null);
					fileInputRef.current.value = '';
				}}
			/>
			<TextInput
				label='First name'
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
				placeholder={user?.first_name}
			/>
			<TextInput
				label='Last name'
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
				placeholder={user?.last_name}
			/>
			<div className='mb-6'>
				<ThemeButtons
					text={isSubmitting ? 'Updating...' : 'Update'}
					style={1}
					onclick={manageSubmit}
					disabled={isSubmitting}
				/>
			</div>
			{profilePictureError && (
				<ErrorModal
					message={profilePictureError}
					onClose={() => setProfilePictureError(null)}
					title='Image error'
				/>
			)}
			<GeneralModal show={isSuccess} onClose={() => setIsSuccess(false)}>
				<div>
					<div className='flex justify-center pb-4'>
						<h1 className='text-2xl'>Success !!!</h1>
					</div>
					<p>Your profile has been updated successfully</p>
				</div>
			</GeneralModal>
		</div>
	);
};

export default BasicDetailsEdit;
