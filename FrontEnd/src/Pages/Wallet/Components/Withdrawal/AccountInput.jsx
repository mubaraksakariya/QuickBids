import React, { useState } from 'react';
import ThemeButtons from '../../../../Components/Buttons/ThemeButton';
import ConfirmationDialog from '../../../../Components/Models/ConfirmationDialog';
import BankDetailsForm from './BankDetailsForm';
import useCreateWithdrawalRequest from '../../../../CustomHooks/useCreateWithdrawalRequest';
import GeneralModal from '../../../../Components/Models/GeneralModal';
import ErrorModal from '../../../../Components/Models/ErrorModal';

export const AccountInput = ({ setIsWithdraw }) => {
	const [amount, setAmount] = useState('');
	const [accountNumber, setAccountNumber] = useState('');
	const [ifscCode, setIfscCode] = useState('');
	const [confirmation, setConfirmation] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const {
		mutate: createWithdrawal,
		isLoading,
		error,
		isError,
		isSuccess,
	} = useCreateWithdrawalRequest('account');

	const validate = () => {
		setErrorMessage('');
		setSuccessMessage('');

		// Basic validation checks
		if (!amount || !accountNumber || !ifscCode) {
			setErrorMessage('Please fill in all required fields.');
			return;
		}

		if (isNaN(amount) || parseFloat(amount) <= 0) {
			setErrorMessage('Please enter a valid amount.');
			return;
		}
		setConfirmation(true);
	};

	const handlePayoutRequest = () => {
		createWithdrawal(
			{ accountNumber, ifscCode, amount },
			{
				onSuccess: (data) => {
					setSuccessMessage(
						'Withdrawal request created successfully.'
					);
					setAmount('');
					setAccountNumber('');
					setIfscCode('');
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

			{/* Bank Details Form */}
			<BankDetailsForm
				amount={amount}
				setAmount={setAmount}
				accountNumber={accountNumber}
				setAccountNumber={setAccountNumber}
				setIfscCode={setIfscCode}
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
