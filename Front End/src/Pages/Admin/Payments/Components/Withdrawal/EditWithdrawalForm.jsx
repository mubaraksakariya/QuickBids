import React, { useState } from 'react';

const EditWithdrawalForm = ({
	formValues,
	handleInputChange,
	errors,
	handleSave,
	onClose,
}) => {
	// Check if failure_reason input should be shown
	const shouldShowFailureReason =
		formValues.status === 'REJECTED' || formValues.status === 'FAILED';

	return (
		<div className='lg:flex-1 flex flex-col justify-between items-center min-w-[24rem] bg-sectionBgColour2 py-6 pe-6'>
			<div className='p-6 bg-sectionBgColour5 rounded-lg shadow-sm w-full'>
				<h2 className='text-xl font-semibold mb-6'>
					Edit Withdrawal Request
				</h2>

				<div className='mb-4'>
					<label className='block text-sm font-medium'>Status</label>
					<select
						className='w-full p-2 border rounded'
						value={formValues.status}
						onChange={(e) =>
							handleInputChange('status', e.target.value)
						}>
						<option value='PENDING'>Pending</option>
						<option value='APPROVED'>Approved</option>
						<option value='REJECTED'>Rejected</option>
						<option value='COMPLETED'>Completed</option>
						<option value='FAILED'>Failed</option>
					</select>
					{errors.status && (
						<p className='text-red-500 text-sm'>{errors.status}</p>
					)}
				</div>

				{/* Conditionally render failure_reason input */}
				{shouldShowFailureReason && (
					<div className='mb-4'>
						<label className='block text-sm font-medium'>
							Failure Reason
						</label>
						<input
							type='text'
							className='w-full p-2 border rounded'
							value={formValues.failure_reason || ''}
							onChange={(e) =>
								handleInputChange(
									'failure_reason',
									e.target.value
								)
							}
							placeholder='Provide the reason for failure/rejection'
						/>
						{errors.failure_reason && (
							<p className='text-red-500 text-sm'>
								{errors.failure_reason}
							</p>
						)}
					</div>
				)}

				{/* Action Buttons */}
				<div className='mt-6 w-full flex justify-end space-x-3'>
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
		</div>
	);
};

export default EditWithdrawalForm;
