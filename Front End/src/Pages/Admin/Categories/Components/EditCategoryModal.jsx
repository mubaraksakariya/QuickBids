import React, { useState } from 'react';
import useUpdateCategory from '../../../../CustomHooks/useUpdateCategory';
import { validateCategoryForm } from './validateCategoryForm';
import { useError } from '../../../../Context/ErrorContext';
import GeneralModal from '../../../../Components/Models/GeneralModal';
import ImageManager from '../../Products/Components/ImageManager';
import CategoryEdit from './CategoryEdit';
import CategoryDetails from './CategoryDetails';

const EditCategoryModal = ({ category, onClose }) => {
	const [is_edited, setIsEdited] = useState(false);
	const [errors, setErrors] = useState({});
	const { showError } = useError();

	const [formValues, setFormValues] = useState({
		name: category?.name || '',
		description: category?.description || '',
		is_approved: category?.is_approved || false,
		images: category?.images || [],
		images_to_remove: [],
	});

	const { mutate: updateCategory, isSuccess, isError } = useUpdateCategory();

	const handleSave = () => {
		setErrors({});
		const validationErrors = validateCategoryForm(formValues);
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			showError('Please correct the highlighted fields.');
			return;
		}

		if (!is_edited) {
			showError('Please update something to save changes.');
			return;
		}

		const formData = new FormData();
		formData.append('name', formValues.name);
		formData.append('description', formValues.description);
		formData.append('is_approved', formValues.is_approved);
		formData.append(
			'images_to_remove',
			JSON.stringify(formValues.images_to_remove)
		);

		formValues.images.forEach((img) => {
			if (img.file) {
				formData.append('images', img.file);
			}
		});

		updateCategory({ categoryId: category.id, formData });
	};

	const handleInputChange = (name, value) => {
		setFormValues({ ...formValues, [name]: value });
		setIsEdited(true);
	};

	const handleAddImage = (imageObj) => {
		setFormValues({
			...formValues,
			images: [...formValues.images, imageObj],
		});
		setIsEdited(true);
	};

	const handleDeleteImage = (imageId) => {
		setFormValues((prevValues) => ({
			...prevValues,
			images: prevValues.images.filter((img) => img.id !== imageId),
			images_to_remove: [...prevValues.images_to_remove, imageId],
		}));
		setIsEdited(true);
	};

	return (
		<div className='fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='flex lg:flex-row flex-col justify-center bg-sectionBgColour2 rounded-lg shadow-lg overflow-hidden min-w-[60%] lg:max-w-[60%]'>
				{/* Left Section: Category Details */}
				<div className='flex-1 p-6'>
					<CategoryDetails category={category} />
				</div>

				{/* Right Section: Image Manager */}
				<div className='flex-1 bg-sectionBgColour5 p-6 m-6 lg:w-96 w-full rounded-lg shadow-lg'>
					<CategoryEdit
						formValues={formValues}
						onInputChange={handleInputChange}
						errors={errors}
					/>
					{/* <ImageManager
						images={formValues.images}
						onAddImage={handleAddImage}
						onDeleteImage={handleDeleteImage}
					/> */}
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

			{/* Success Modal */}
			<GeneralModal
				show={isSuccess}
				onClose={onClose}
				autoCloseAfter={3000}>
				<div>
					<h1 className='text-center text-xl mb-3'>Success!</h1>
				</div>
				<div>
					<p>The category has been updated successfully</p>
				</div>
			</GeneralModal>
		</div>
	);
};

export default EditCategoryModal;
