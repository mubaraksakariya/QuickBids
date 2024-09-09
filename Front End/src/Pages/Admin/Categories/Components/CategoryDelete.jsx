import React, { useState } from 'react';
import ThemeButtons from '../../../../Components/Buttons/ThemeButton';
import ConfirmationDialog from '../../../../Components/Models/ConfirmationDialog';
import useUpdateCategory from '../../../../CustomHooks/useUpdateCategory';

const CategoryDelete = ({ category, onDelete }) => {
	const [isDelete, setIsDelete] = useState(false);
	const [randomString, setRandomString] = useState('');
	const [randomStringError, setRandomStringError] = useState('');
	const [inputValue, setInputValue] = useState('');

	const { mutate, isSuccess, isError } = useUpdateCategory();

	// Function to generate a random string
	const generateRandomString = (length = 6) => {
		const characters =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let result = '';
		for (let i = 0; i < length; i++) {
			result += characters.charAt(
				Math.floor(Math.random() * characters.length)
			);
		}
		return result;
	};

	// Function to manage the delete process
	const initialteDeletion = () => {
		const generatedString = generateRandomString();
		setRandomString(generatedString); // Set the random string
		setIsDelete(true);
	};

	// Handle input change
	const handleInputChange = (e) => {
		setRandomStringError('');
		setInputValue(e.target.value);
	};

	const deleteCategory = () => {
		if (inputValue === randomString) {
			console.log('Category deleted'); // Handle actual deletion here
			const formData = new FormData();
			formData.append('is_deleted', true);
			mutate({ categoryId: category.id, formData });
			setIsDelete(false);
			onDelete();
		} else {
			setRandomStringError('Incorrect string. Please try again.');
		}
	};

	return (
		<div className='bg-sectionBgColour5 p-6 rounded-lg shadow-lg max-w-md mx-auto'>
			<h2 className='text-headerColour text-xl font-semibold mb-4'>
				Delete Category
			</h2>
			<p className='text-bodyTextColour mb-6'>
				Once deleted, this category wont be available further and take
				care of the related products.
			</p>
			<div className=' flex justify-end'>
				<ThemeButtons
					text='Delete'
					onclick={initialteDeletion}
					style={17}
					className={'px-3'}
				/>
			</div>
			<ConfirmationDialog
				isOpen={isDelete}
				onConfirm={deleteCategory}
				onCancel={() => setIsDelete(false)}
				message={
					<div className='relative pb-6'>
						<p className='text-bodyTextColour mb-2'>
							To confirm deletion, please enter the following
							string:
						</p>
						<p className='font-bold text-button2Colour1 text-lg mb-4'>
							{randomString}
						</p>
						<input
							type='text'
							className='mt-2 p-3 border border-cardBorderColour rounded w-full focus:outline-none focus:ring-2 focus:ring-button2Colour1'
							placeholder='Enter the string here'
							value={inputValue}
							onChange={handleInputChange}
						/>
						{randomStringError && (
							<p className='text-errorColour text-sm mt-2 absolute bottom-0'>
								{randomStringError}
							</p>
						)}
					</div>
				}
			/>
		</div>
	);
};

export default CategoryDelete;
