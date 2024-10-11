import React, { useState } from 'react';

const CardDetailsForm = ({
	amount,
	setAmount,
	cardNumber,
	setCardNumber,
	cvv,
	setCvv,
	expiryDate,
	setExpiryDate,
	nameOnCard,
	setNameOnCard,
}) => {
	const [confirmCardNumber, setConfirmCardNumber] = useState('');
	const [cardMismatch, setCardMismatch] = useState(false);
	const [expiryDateError, setExpiryDateError] = useState('');

	// Validation for card number matching
	const handleCardNumberChange = (e) => {
		const value = e.target.value;
		setCardNumber(value);
		if (confirmCardNumber && value !== confirmCardNumber) {
			setCardMismatch(true);
		} else {
			setCardMismatch(false);
		}
	};

	const handleConfirmCardNumberChange = (e) => {
		const value = e.target.value;
		setConfirmCardNumber(value);
		if (value !== cardNumber) {
			setCardMismatch(true);
		} else {
			setCardMismatch(false);
		}
	};

	// Validation for expiry date format (MM/YY)
	const handleExpiryDateChange = (e) => {
		const value = e.target.value;
		setExpiryDate(value);

		// Simple regex to match MM/YY format
		const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
		if (!regex.test(value)) {
			setExpiryDateError('Invalid expiry date format. Use MM/YY.');
		} else {
			setExpiryDateError('');
		}
	};

	// Handle name on card change
	const handleNameOnCardChange = (e) => {
		setNameOnCard(e.target.value);
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
					htmlFor='cardNumber'
					className='block text-bodyTextColour mb-2'>
					Card Number
				</label>
				<input
					type='text'
					id='cardNumber'
					value={cardNumber}
					onChange={handleCardNumberChange}
					className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
						cardMismatch
							? 'border-errorColour'
							: 'focus:ring-button2Colour2'
					}`}
					required
				/>
			</div>

			<div>
				<label
					htmlFor='confirmCardNumber'
					className='block text-bodyTextColour mb-2'>
					Confirm Card Number
				</label>
				<input
					type='text'
					id='confirmCardNumber'
					value={confirmCardNumber}
					onChange={handleConfirmCardNumberChange}
					className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
						cardMismatch
							? 'border-errorColour'
							: 'focus:ring-button2Colour2'
					}`}
					required
				/>
				{cardMismatch && (
					<p className='text-errorColour mt-1'>
						Card numbers do not match.
					</p>
				)}
			</div>

			<div>
				<label
					htmlFor='expiryDate'
					className='block text-bodyTextColour mb-2'>
					Expiry Date (MM/YY)
				</label>
				<input
					type='text'
					id='expiryDate'
					value={expiryDate}
					onChange={handleExpiryDateChange}
					className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
						expiryDateError
							? 'border-errorColour'
							: 'focus:ring-button2Colour2'
					}`}
					required
				/>
				{expiryDateError && (
					<p className='text-errorColour mt-1'>{expiryDateError}</p>
				)}
			</div>

			<div>
				<label htmlFor='cvv' className='block text-bodyTextColour mb-2'>
					CVV
				</label>
				<input
					type='password'
					id='cvv'
					value={cvv}
					onChange={(e) => setCvv(e.target.value)}
					className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-button2Colour2'
					required
					maxLength={3} // Assuming CVV is always 3 digits
				/>
			</div>

			<div>
				<label
					htmlFor='nameOnCard'
					className='block text-bodyTextColour mb-2'>
					Name on Card
				</label>
				<input
					type='text'
					id='nameOnCard'
					value={nameOnCard}
					onChange={handleNameOnCardChange}
					className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-button2Colour2'
					required
				/>
			</div>
		</div>
	);
};

export default CardDetailsForm;
