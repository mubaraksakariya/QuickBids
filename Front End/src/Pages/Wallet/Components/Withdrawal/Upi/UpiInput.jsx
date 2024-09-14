import React, { useState } from 'react';
import UPIDetailsForm from './UPIDetailsForm';
import ThemeButtons from '../../../../../Components/Buttons/ThemeButton';
import ConfirmationDialog from '../../../../../Components/Models/ConfirmationDialog';
import GeneralModal from '../../../../../Components/Models/GeneralModal';
import ErrorModal from '../../../../../Components/Models/ErrorModal';
import useCreateWithdrawalRequest from '../../../../../CustomHooks/useCreateWithdrawalRequest';

export const UPIInput = ({ setIsWithdraw }) => {
	const [amount, setAmount] = useState('');
	const [upiId, setUpiId] = useState('');
	const [confirmation, setConfirmation] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const {
		mutate: createWithdrawal,
		isLoading,
		error,
		isError,
		isSuccess,
	} = useCreateWithdrawalRequest('upi');

	const validate = () => {
		setErrorMessage('');
		setSuccessMessage('');

		// Basic validation checks
		if (!amount || !upiId) {
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
			{ upiId, amount },
			{
				onSuccess: (data) => {
					setSuccessMessage(
						'Withdrawal request created successfully.'
					);
					setAmount('');
					setUpiId('');
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
				Request UPI Payout
			</h2>

			{/* UPI Details Form */}
			<UPIDetailsForm
				amount={amount}
				setAmount={setAmount}
				upiId={upiId}
				setUpiId={setUpiId}
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

export default UPIInput;
