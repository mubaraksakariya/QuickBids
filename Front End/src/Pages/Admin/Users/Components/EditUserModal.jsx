import React, { useState } from 'react';
import { useError } from '../../../../Context/ErrorContext';
import GeneralModal from '../../../../Components/Models/GeneralModal';
import UserDetails from './UserDetails';
import EditUserInputs from './EditUserInputs';
import ProfileImageManager from './ProfileImageManager';
import { validateUserFormValues } from './formValidation.js';
import BlockUser from './BlockUser.jsx';
import useUpdateUserData from '../../../../CustomHooks/useUpdateUserData.jsx';

const EditUserModal = ({ user, onClose }) => {
	const [isEdited, setIsEdited] = useState(false);
	const [errors, setErrors] = useState({});
	const { showError } = useError();

	const [formValues, setFormValues] = useState({
		first_name: user?.first_name || '',
		last_name: user?.last_name || '',
		auth_provider: user?.auth_provider,
		email: user?.email || '',
		is_active: user?.is_active,
		profile_picture: user?.profile_picture || [],
		profile_picture_remove: false,
		is_blocked: user?.is_blocked || false,
	});

	const {
		mutate: updateUser,
		error,
		isError,
		isSuccess,
	} = useUpdateUserData();

	const handleSave = () => {
		setErrors({});
		const validationErrors = validateUserFormValues(formValues);
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			console.log(validationErrors);
			return;
		}
		if (!isEdited) {
			showError('Update something to save');
			return;
		}

		const formData = new FormData();
		formData.append('first_name', formValues.first_name);
		formData.append('last_name', formValues.last_name);
		formData.append('auth_provider', formValues.auth_provider);
		formData.append('is_active', formValues.is_active);
		formData.append('is_blocked', formValues.is_blocked);
		formData.append(
			'profile_picture_remove',
			formValues.profile_picture_remove
		);

		if (formValues.profile_picture?.file) {
			formData.append('profile_picture', formValues.profile_picture.file);
		}
		if (!formData) {
			console.error('FormData is not valid');
			return;
		}
		updateUser({ userId: user.id, userData: formData });
	};

	const handleInputChange = (name, value) => {
		setFormValues({ ...formValues, [name]: value });
		setIsEdited(true);
	};

	const handleAddProfilePicture = (imageObj) => {
		setFormValues({
			...formValues,
			profile_picture: imageObj,
			profile_picture_remove: true,
		});
		setIsEdited(true);
	};

	const handleDeleteProfilePicture = () => {
		setFormValues({
			...formValues,
			profile_picture: null,
			profile_picture_remove: true,
		});
		setIsEdited(true);
	};

	const handleBlockChange = (blockStatus) => {
		setFormValues((prevValues) => ({
			...prevValues,
			is_blocked: blockStatus,
		}));
		setIsEdited(true);
	};
	console.log(user);

	return (
		<div className='fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='flex lg:flex-row flex-col justify-center bg-sectionBgColour2 rounded-lg shadow-lg overflow-hidden min-w-[50%] lg:max-w-[60%]'>
				{' '}
				{/* Left Section: User Details */}
				<div className='lg:flex-1 p-6'>
					<UserDetails user={user} />
					<BlockUser
						user={user}
						isBlocked={formValues.is_blocked}
						onBlockChange={handleBlockChange}
					/>
					<div className='mt-6 w-full flex justify-end space-x-3 p-6'>
						<button
							className='bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300'
							onClick={onClose}>
							Cancel
						</button>
						<button
							className='bg-buttonColour1 text-white py-2 px-4 rounded-md hover:bg-buttonColour2 focus:outline-none focus:ring-2 focus:ring-buttonColour3'
							onClick={handleSave}>
							Save
						</button>
					</div>
				</div>
				{/* Right Section: Edit Form */}
				{/* <div className='lg:flex-1 flex flex-col justify-between items-center min-w-[24rem] bg-sectionBgColour2 py-6 pe-6'>
					<div className='p-6 bg-sectionBgColour5 rounded-lg shadow-sm w-full'>
						<EditUserInputs
							formValues={formValues}
							onInputChange={handleInputChange}
							errors={errors}
							user={user}
						/>
						<ProfileImageManager
							image={formValues.profile_picture}
							onAddImage={handleAddProfilePicture}
							onDeleteImage={handleDeleteProfilePicture}
						/>
					</div>

					<div className='mt-6 w-full flex justify-end space-x-3 p-6'>
						<button
							className='bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300'
							onClick={onClose}>
							Cancel
						</button>
						<button
							className='bg-buttonColour1 text-white py-2 px-4 rounded-md hover:bg-buttonColour2 focus:outline-none focus:ring-2 focus:ring-buttonColour3'
							onClick={handleSave}>
							Save
						</button>
					</div>
				</div> */}
			</div>

			<GeneralModal
				show={isSuccess}
				onClose={onClose}
				autoCloseAfter={3000}>
				<div>
					<h1 className='text-center text-xl mb-3 text-headerColour'>
						Congratulations!
					</h1>
					<p className='text-center text-bodyTextColour'>
						The user has been updated successfully.
					</p>
				</div>
			</GeneralModal>
		</div>
	);
};

export default EditUserModal;
