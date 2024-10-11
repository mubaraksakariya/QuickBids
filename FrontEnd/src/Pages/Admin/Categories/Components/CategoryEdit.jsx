import React from 'react';

const CategoryEdit = ({ formValues, onInputChange, errors }) => {
	return (
		<div className='space-y-4'>
			<div>
				<label
					htmlFor='name'
					className='block text-sm font-medium text-gray-700'>
					Name
				</label>
				<input
					type='text'
					id='name'
					name='name'
					value={formValues?.name}
					onChange={(e) => onInputChange('name', e.target.value)}
					className={`mt-1 block w-full px-3 py-2 border ${
						errors?.name ? 'border-red-500' : 'border-gray-300'
					} rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50`}
				/>
				{errors?.name && (
					<p className='mt-2 text-sm text-red-600'>{errors?.name}</p>
				)}
			</div>

			<div>
				<label
					htmlFor='description'
					className='block text-sm font-medium text-gray-700'>
					Description
				</label>
				<textarea
					id='description'
					name='description'
					value={formValues?.description}
					onChange={(e) =>
						onInputChange('description', e.target.value)
					}
					className={`mt-1 block w-full px-3 py-2 border ${
						errors?.description
							? 'border-red-500'
							: 'border-gray-300'
					} rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50`}
				/>
				{errors?.description && (
					<p className='mt-2 text-sm text-red-600'>
						{errors.description}
					</p>
				)}
			</div>

			<div>
				<label
					htmlFor='is_approved'
					className='inline-flex items-center text-sm font-medium text-gray-700'>
					<input
						type='checkbox'
						id='is_approved'
						name='is_approved'
						checked={formValues?.is_approved}
						onChange={(e) =>
							onInputChange('is_approved', e.target.checked)
						}
						className='form-checkbox'
					/>
					<span className='ml-2'>Approved</span>
				</label>
			</div>
		</div>
	);
};

export default CategoryEdit;
