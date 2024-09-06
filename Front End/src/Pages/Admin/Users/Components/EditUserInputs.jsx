import React from 'react';

const EditUserInputs = ({ formValues, onInputChange, errors }) => {
	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		onInputChange(name, type === 'checkbox' ? checked : value);
	};

	return (
		<>
			<h2 className='text-2xl font-semibold text-headerColour mb-4'>
				Edit User
			</h2>
			<div className='space-y-4'>
				{/* First Name Input */}
				<div>
					<label className='block text-sm font-medium text-bodyTextColour'>
						First Name
					</label>
					<input
						type='text'
						name='first_name'
						value={formValues?.first_name || ''}
						onChange={handleInputChange}
						className='mt-1 block w-full border border-cardBorderColour rounded-md p-2 bg-white text-bodyTextColour focus:outline-none focus:ring-2 focus:ring-buttonColour1'
					/>
					{errors?.first_name && (
						<p className='text-red-500 text-sm'>
							{errors.first_name}
						</p>
					)}
				</div>

				{/* Last Name Input */}
				<div>
					<label className='block text-sm font-medium text-bodyTextColour'>
						Last Name
					</label>
					<input
						type='text'
						name='last_name'
						value={formValues?.last_name || ''}
						onChange={handleInputChange}
						className='mt-1 block w-full border border-cardBorderColour rounded-md p-2 bg-white text-bodyTextColour focus:outline-none focus:ring-2 focus:ring-buttonColour1'
					/>
					{errors?.last_name && (
						<p className='text-red-500 text-sm'>
							{errors.last_name}
						</p>
					)}
				</div>
				{/* Email (Non-Editable) */}
				<div>
					<label className='block text-sm font-medium text-bodyTextColour'>
						Email
					</label>
					<input
						type='email'
						name='email'
						value={formValues?.email || ''}
						disabled
						className='mt-1 block w-full border border-cardBorderColour rounded-md p-2 bg-gray-100 text-bodyTextColour opacity-50'
					/>
					{errors?.email && (
						<p className='text-red-500 text-sm'>{errors.email}</p>
					)}
				</div>

				{/* Auth Provider Input */}
				<div>
					<label className='block text-sm font-medium text-bodyTextColour'>
						Auth Provider
					</label>
					<select
						name='auth_provider'
						value={formValues?.auth_provider || 'local'}
						onChange={handleInputChange}
						className='mt-1 block w-full border border-cardBorderColour rounded-md p-2 bg-white text-bodyTextColour focus:outline-none focus:ring-2 focus:ring-buttonColour1'>
						<option value='local'>Local</option>
						<option value='google'>Google</option>
					</select>
					{errors?.auth_provider && (
						<p className='text-red-500 text-sm'>
							{errors.auth_provider}
						</p>
					)}
				</div>

				{/* Is Active Input */}
				<div>
					<label className='block text-sm font-medium text-bodyTextColour'>
						Is Active
					</label>
					<input
						type='checkbox'
						name='is_active'
						checked={formValues?.is_active}
						onChange={handleInputChange}
						className='mt-1 block'
					/>
					{errors?.is_active && (
						<p className='text-red-500 text-sm'>
							{errors.is_active}
						</p>
					)}
				</div>
			</div>
		</>
	);
};

export default EditUserInputs;
