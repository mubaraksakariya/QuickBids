import React, { useState } from 'react';
import { useError } from '../../../../Context/ErrorContext';
import useCreateCategory from '../../../../CustomHooks/useCreateCategory';
import ConfirmationDialog from '../../../../Components/Models/ConfirmationDialog';

const CreateCategoryForm = ({ onSuccess }) => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { mutate: createCategory, isLoading, isError } = useCreateCategory();
	const { showError } = useError();

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!name) {
			showError('Name is required');
			return;
		}

		// Open the confirmation dialog
		setIsDialogOpen(true);
	};

	const handleConfirm = () => {
		createCategory(
			{ name, description },
			{
				onSuccess: () => {
					setName('');
					setDescription('');
					setIsDialogOpen(false);
					if (onSuccess) onSuccess();
				},
				onError: (error) => {
					setIsDialogOpen(false);
					showError(error.message);
				},
			}
		);
	};

	const handleCancel = () => {
		setIsDialogOpen(false);
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className='p-6 bg-sectionBgColour2 rounded-lg shadow-md space-y-4'>
				<h2 className='text-2xl font-bold mb-4'>Create New Category</h2>

				<div className='space-y-2'>
					<label className='block'>
						<span className='text-gray-700'>Name</span>
						<input
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
							className='form-input mt-1 block w-full'
							required
						/>
					</label>
					<label className='block'>
						<span className='text-gray-700'>Description</span>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className='form-textarea mt-1 block w-full'
							rows='3'
						/>
					</label>
				</div>

				<div className='flex justify-end space-x-2'>
					<button
						type='submit'
						className='bg-buttonColour1 text-white py-2 px-4 rounded-md hover:bg-buttonColour2 focus:outline-none focus:ring-2 focus:ring-buttonColour3'
						disabled={isLoading}>
						{isLoading ? 'Creating...' : 'Create'}
					</button>
				</div>

				{isError && (
					<p className='text-red-500'>
						An error occurred: {isError.message}
					</p>
				)}
			</form>

			<ConfirmationDialog
				message='Are you sure you want to create this category?'
				isOpen={isDialogOpen}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
			/>
		</>
	);
};

export default CreateCategoryForm;
