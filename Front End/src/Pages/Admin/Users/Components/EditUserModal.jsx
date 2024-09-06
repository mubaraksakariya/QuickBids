import React, { useState } from 'react';
import useUpdateUser from '../../../../CustomHooks/useUpdateUser';
import { useError } from '../../../../Context/ErrorContext';
import GeneralModal from '../../../../Components/Models/GeneralModal';
import ImageManager from '../../Products/Components/ImageManager';
import UserDetails from './UserDetails';
import EditUserInputs from './EditUserInputs';
import { validateUserFormValues } from './formValidation,js';

const EditUserModal = ({ user, onClose }) => {
	const [isEdited, setIsEdited] = useState(false);
	const [errors, setErrors] = useState({});
	const { showError } = useError();

	const [formValues, setFormValues] = useState({
		name: user?.name || '',
		email: user?.email || '',
		role: user?.role || '',
		status: user?.is_active ? 'active' : 'inactive',
		profilePicture: user?.profilePicture || [],
		picture_to_remove: null,
	});

	const { mutate: updateUser, error, isError, isSuccess } = useUpdateUser();

	const handleSave = () => {
		setErrors({});
		const validationErrors = validateUserFormValues(formValues);
		if (Object.keys(validationErrors).length > 0) {
			console.log(validationErrors);
			setErrors(validationErrors);
			showError(validationErrors);
			return;
		}
		if (!isEdited) {
			showError('Update something to save');
			return;
		}

		const formData = new FormData();
		formData.append('name', formValues.name);
		formData.append('email', formValues.email);
		formData.append('role', formValues.role);
		formData.append('status', formValues.status);

		if (formValues.picture_to_remove) {
			formData.append('picture_to_remove', formValues.picture_to_remove);
		}

		if (formValues.profilePicture?.file) {
			formData.append('profilePicture', formValues.profilePicture.file);
		}

		console.log('Saving user data...', formValues);
		updateUser({ userId: user.id, formData });
	};

	const handleInputChange = (name, value) => {
		setFormValues({ ...formValues, [name]: value });
		setIsEdited(true);
	};

	const handleAddProfilePicture = (imageObj) => {
		setFormValues({
			...formValues,
			profilePicture: imageObj,
		});
		setIsEdited(true);
	};

	const handleDeleteProfilePicture = () => {
		setFormValues({
			...formValues,
			profilePicture: null,
			picture_to_remove: user.profilePicture?.id || null,
		});
		setIsEdited(true);
	};

	return (
		<div className='fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='lg:flex items-start bg-sectionBgColour2 rounded-lg shadow-lg overflow-hidden'>
				{/* Left Section: User Details */}
				<div className='flex-1 p-6'>
					<UserDetails user={user} />
				</div>

				{/* Right Section: Edit Form */}
				<div className='flex-1 bg-sectionBgColour5 p-6 m-6 w-96 rounded-lg shadow-lg'>
					<EditUserInputs
						formValues={formValues}
						onInputChange={handleInputChange}
						errors={errors}
						user={user}
					/>
					<ImageManager
						images={[formValues.profilePicture]}
						onAddImage={handleAddProfilePicture}
						onDeleteImage={handleDeleteProfilePicture}
					/>
					<div className='mt-6 flex justify-end space-x-2'>
						<button
							className='bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400'
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
			</div>
			<GeneralModal
				show={isSuccess}
				onClose={onClose}
				autoCloseAfter={3000}>
				<div>
					<h1 className='text-center text-xl mb-3'>
						Congratulations !!
					</h1>
				</div>
				<div>
					<p>The user has been updated successfully</p>
				</div>
			</GeneralModal>
		</div>
	);
};

export default EditUserModal;
