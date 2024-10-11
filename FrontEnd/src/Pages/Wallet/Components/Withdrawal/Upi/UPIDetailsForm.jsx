import React, { useState } from 'react';

const UPIDetailsForm = ({ amount, setAmount, upiId, setUpiId }) => {
	const [confirmUpiId, setConfirmUpiId] = useState('');
	const [upiMismatch, setUpiMismatch] = useState(false);
	const [upiError, setUpiError] = useState('');

	// Validation for UPI ID matching
	const handleUpiIdChange = (e) => {
		const value = e.target.value;
		setUpiId(value);
		if (confirmUpiId && value !== confirmUpiId) {
			setUpiMismatch(true);
		} else {
			setUpiMismatch(false);
		}
	};

	const handleConfirmUpiIdChange = (e) => {
		const value = e.target.value;
		setConfirmUpiId(value);
		if (value !== upiId) {
			setUpiMismatch(true);
		} else {
			setUpiMismatch(false);
		}
	};

	// Basic UPI ID format validation (This can be improved with more complex regex)
	const validateUpiId = () => {
		const regex = /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{3,}$/;
		if (!regex.test(upiId)) {
			setUpiError('Invalid UPI ID format.');
		} else {
			setUpiError('');
		}
	};

	return (
		<div className='mb-4'>
			<div>
				<label
					htmlFor='amount'
					className='block text-bodyTextColour mb-2'>
					Amount to Withdraw
				</label>
				<input
					type='number'
					id='amount'
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-button2Colour2'
					required
				/>
			</div>

			<div>
				<label
					htmlFor='upiId'
					className='block text-bodyTextColour mb-2'>
					UPI ID
				</label>
				<input
					type='text'
					id='upiId'
					value={upiId}
					onChange={handleUpiIdChange}
					onBlur={validateUpiId}
					className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
						upiError
							? 'border-errorColour'
							: 'focus:ring-button2Colour2'
					}`}
					required
				/>
				{upiError && (
					<p className='text-errorColour mt-1'>{upiError}</p>
				)}
			</div>

			<div>
				<label
					htmlFor='confirmUpiId'
					className='block text-bodyTextColour mb-2'>
					Confirm UPI ID
				</label>
				<input
					type='text'
					id='confirmUpiId'
					value={confirmUpiId}
					onChange={handleConfirmUpiIdChange}
					className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
						upiMismatch
							? 'border-errorColour'
							: 'focus:ring-button2Colour2'
					}`}
					required
				/>
				{upiMismatch && (
					<p className='text-errorColour mt-1'>
						UPI IDs do not match.
					</p>
				)}
			</div>
		</div>
	);
};

export default UPIDetailsForm;
