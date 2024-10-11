import React, { useState } from 'react';
import ThemeButtons from '../../../../../Components/Buttons/ThemeButton';
import ConfirmationDialog from '../../../../../Components/Models/ConfirmationDialog';
import useCreateWithdrawalRequest from '../../../../../CustomHooks/useCreateWithdrawalRequest';
import GeneralModal from '../../../../../Components/Models/GeneralModal';
import ErrorModal from '../../../../../Components/Models/ErrorModal';
import CardDetailsForm from './CardDetailsForm';

const CardInput = ({ setIsWithdraw }) => {
	const [amount, setAmount] = useState('');
	const [cardNumber, setCardNumber] = useState('');
	const [cvv, setCvv] = useState('');
	const [expiryDate, setExpiryDate] = useState('');
	const [nameOnCard, setNameOnCard] = useState('');
	const [confirmation, setConfirmation] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const {
		mutate: createWithdrawal,
		isLoading,
		error,
		isError,
		isSuccess,
	} = useCreateWithdrawalRequest('card'); // For card-based withdrawal

	const validate = () => {
		setErrorMessage('');
		setSuccessMessage('');

		// Basic validation checks
		if (!amount || !cardNumber || !cvv || !expiryDate) {
			setErrorMessage('Please fill in all required fields.');
			return;
		}

		if (isNaN(amount) || parseFloat(amount) <= 0) {
			setErrorMessage('Please enter a valid amount.');
			return;
		}

		// Check if card number and cvv are valid numbers
		if (isNaN(cardNumber) || cardNumber.length !== 16) {
			setErrorMessage('Please enter a valid 16-digit card number.');
			return;
		}

		if (isNaN(cvv) || cvv.length !== 3) {
			setErrorMessage('Please enter a valid 3-digit CVV.');
			return;
		}

		setConfirmation(true);
	};

	const handlePayoutRequest = () => {
		createWithdrawal(
			{ cardNumber, cvv, expiryDate, nameOnCard, amount },
			{
				onSuccess: (data) => {
					setSuccessMessage(
						'Withdrawal request created successfully.'
					);
					setAmount('');
					setCardNumber('');
					setCvv('');
					setExpiryDate('');
				},
				onError: (err) => {
					console.error(err);
					setErrorMessage(err.message || 'An error occurred.');
				},
			}
		);
		setConfirmation(false);
	};

	return (
		<div className='p-6 m-6 bg-sectionBgColour1 border border-cardBorderColour rounded-lg shadow-lg'>
			<h2 className='text-2xl font-bold text-headerColour mb-6'>
				Request Payout
			</h2>

			{/* Card Details Form */}
			<CardDetailsForm
				amount={amount}
				setAmount={setAmount}
				cardNumber={cardNumber}
				setCardNumber={setCardNumber}
				cvv={cvv}
				setCvv={setCvv}
				expiryDate={expiryDate}
				setExpiryDate={setExpiryDate}
				nameOnCard={nameOnCard}
				setNameOnCard={setNameOnCard}
			/>

			{/* Action Buttons */}
			<div className='flex gap-4 justify-center'>
				<ThemeButtons
					text={isLoading ? 'Processing...' : 'Request'}
					onclick={validate}
					style={3}
					className='p-2 w-full'
					disabled={isLoading}
				/>
				<ThemeButtons
					text='Cancel'
					onclick={() => setIsWithdraw(false)}
					style={5}
					className='p-2 w-full'
				/>
			</div>

			{/* Confirmation Dialog */}
			<ConfirmationDialog
				message={`Are you sure you want to request a payout of ₹${amount}?`}
				isOpen={confirmation}
				onConfirm={handlePayoutRequest}
				onCancel={() => setConfirmation(false)}
			/>

			{/* General Success Modal */}
			<GeneralModal
				show={Boolean(successMessage)}
				onClose={() => {
					setIsWithdraw(false);
					window.location.reload();
				}}>
				<p className='text-successColour mb-4'>{successMessage}</p>
			</GeneralModal>

			{/* Error Modal */}
			{errorMessage && (
				<ErrorModal
					message={errorMessage}
					onClose={() => setErrorMessage('')}
				/>
			)}
		</div>
	);
};

export default CardInput;
