import React from 'react';

const EditUserInputs = ({ formValues, onInputChange, errors }) => {
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		onInputChange(name, value);
	};

	return (
		<>
			<h2 className='text-2xl font-semibold text-headerColour mb-4'>
				Edit User
			</h2>
			<div className='space-y-4'>
				{/* Name Input */}
				<div>
					<label className='block text-sm font-medium text-bodyTextColour'>
						Name
					</label>
					<input
						type='text'
						name='name'
						value={formValues?.name}
						onChange={handleInputChange}
						className='mt-1 block w-full border border-cardBorderColour rounded-md p-2 bg-white text-bodyTextColour focus:outline-none focus:ring-2 focus:ring-buttonColour1'
					/>
					{errors?.name && (
						<p className='text-red-500 text-sm'>{errors.name}</p>
					)}
				</div>

				{/* Email Input */}
				<div>
					<label className='block text-sm font-medium text-bodyTextColour'>
						Email
					</label>
					<input
						type='email'
						name='email'
						value={formValues?.email}
						onChange={handleInputChange}
						className='mt-1 block w-full border border-cardBorderColour rounded-md p-2 bg-white text-bodyTextColour focus:outline-none focus:ring-2 focus:ring-buttonColour1'
					/>
					{errors?.email && (
						<p className='text-red-500 text-sm'>{errors.email}</p>
					)}
				</div>

				{/* Role Input */}
				<div>
					<label className='block text-sm font-medium text-bodyTextColour'>
						Role
					</label>
					<select
						name='role'
						value={formValues?.role}
						onChange={handleInputChange}
						className='mt-1 block w-full border border-cardBorderColour rounded-md p-2 bg-white text-bodyTextColour focus:outline-none focus:ring-2 focus:ring-buttonColour1'>
						<option value=''>Select Role</option>
						<option value='admin'>Admin</option>
						<option value='user'>User</option>
					</select>
					{errors?.role && (
						<p className='text-red-500 text-sm'>{errors.role}</p>
					)}
				</div>

				{/* Status Input */}
				<div>
					<label className='block text-sm font-medium text-bodyTextColour'>
						Account Status
					</label>
					<select
						name='status'
						value={formValues?.status}
						onChange={handleInputChange}
						className='mt-1 block w-full border border-cardBorderColour rounded-md p-2 bg-white text-bodyTextColour focus:outline-none focus:ring-2 focus:ring-buttonColour1'>
						<option value='active'>Active</option>
						<option value='inactive'>Inactive</option>
					</select>
					{errors?.status && (
						<p className='text-red-500 text-sm'>{errors.status}</p>
					)}
				</div>

				{/* Additional fields like password change can be added here if needed */}
			</div>
		</>
	);
};

export default EditUserInputs;
