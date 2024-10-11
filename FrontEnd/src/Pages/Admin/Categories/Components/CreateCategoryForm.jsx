import React, { useState } from 'react';
import { useError } from '../../../../Context/ErrorContext';
import useCreateCategory from '../../../../CustomHooks/useCreateCategory';
import ConfirmationDialog from '../../../../Components/Models/ConfirmationDialog';
import ThemeButtons from '../../../../Components/Buttons/ThemeButton';

const CreateCategoryForm = ({ onSuccess, onClose }) => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const {
		mutate: createCategory,
		isLoading,
		isError,
		error,
	} = useCreateCategory();
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
				},
			}
		);
	};

	const handleCancel = () => {
		setIsDialogOpen(false);
	};

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white rounded-lg p-6 shadow-lg relative'>
				<form
					onSubmit={handleSubmit}
					className='p-6 bg-sectionBgColour2 rounded-lg shadow-md space-y-4'>
					<h2 className='text-2xl font-bold mb-4'>
						Create New Category
					</h2>

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
						<ThemeButtons
							text='Cancel'
							onclick={() => onClose()}
							className={' px-2'}
							style={17}
						/>
						<ThemeButtons
							text={isLoading ? 'Creating...' : 'Create'}
							className={' px-2'}
							style={3}
							type='submit'
						/>
					</div>

					{isError && (
						<p className='text-red-500'>
							{error.message && error.message}
						</p>
					)}
				</form>

				<ConfirmationDialog
					message='Are you sure you want to create this category?'
					isOpen={isDialogOpen}
					onConfirm={handleConfirm}
					onCancel={handleCancel}
				/>
			</div>
		</div>
	);
};

export default CreateCategoryForm;
