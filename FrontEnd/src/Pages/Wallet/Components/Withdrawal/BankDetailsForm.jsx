import React, { useEffect, useState } from 'react';
import useFetchIFSCDetails from '../../../../CustomHooks/useFetchIFSCDetails';

const BankDetailsForm = ({
	amount,
	setAmount,
	accountNumber,
	setAccountNumber,
	setIfscCode,
}) => {
	const [ifsc, setIfsc] = useState('');
	const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
	const [accountMismatch, setAccountMismatch] = useState(false);

	const { data: ifscDetails, error, isLoading } = useFetchIFSCDetails(ifsc);

	useEffect(() => {
		if (ifscDetails) {
			setIfscCode(ifsc);
		}
		if (error) {
			setIfscCode('');
		}
	}, [ifscDetails, error, ifsc, setIfscCode]);

	const handleAccountNumberChange = (e) => {
		const value = e.target.value;
		setAccountNumber(value);
		if (confirmAccountNumber && value !== confirmAccountNumber) {
			setAccountMismatch(true);
		} else {
			setAccountMismatch(false);
		}
	};

	const handleConfirmAccountNumberChange = (e) => {
		const value = e.target.value;
		setConfirmAccountNumber(value);
		if (value !== accountNumber) {
			setAccountMismatch(true);
		} else {
			setAccountMismatch(false);
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
					htmlFor='accountNumber'
					className='block text-bodyTextColour mb-2'>
					Bank Account Number
				</label>
				<input
					type='text'
					id='accountNumber'
					value={accountNumber}
					onChange={handleAccountNumberChange}
					className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-button2Colour2'
					required
				/>
			</div>

			<div>
				<label
					htmlFor='confirmAccountNumber'
					className='block text-bodyTextColour mb-2'>
					Confirm Bank Account Number
				</label>
				<input
					type='text'
					id='confirmAccountNumber'
					value={confirmAccountNumber}
					onChange={handleConfirmAccountNumberChange}
					className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
						accountMismatch
							? 'border-errorColour'
							: 'focus:ring-button2Colour2'
					}`}
					required
				/>
				{accountMismatch && (
					<p className='text-errorColour mt-1'>
						Account numbers do not match.
					</p>
				)}
			</div>

			<div>
				<label
					htmlFor='ifscCode'
					className='block text-bodyTextColour mb-2'>
					IFSC Code
				</label>
				<input
					type='text'
					id='ifscCode'
					value={ifsc}
					onChange={(e) => setIfsc(e.target.value)}
					onBlur={() => {
						if (!ifscDetails) setIfscCode('');
					}}
					className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-button2Colour2'
					required
				/>
				{isLoading && <p className='text-bodyTextColour'>Loading...</p>}
				{ifscDetails && (
					<div className='mt-2 p-2 border border-cardBorderColour rounded bg-sectionBgColour2'>
						<p>
							<strong>Bank:</strong> {ifscDetails.BANK}
						</p>
						<p>
							<strong>Branch:</strong> {ifscDetails.BRANCH}
						</p>
						<p>
							<strong>State:</strong> {ifscDetails.STATE}
						</p>
						<p>
							<strong>Contact:</strong>{' '}
							{ifscDetails.CONTACT || 'Not available'}
						</p>
					</div>
				)}
				{error && <p className='text-errorColour'>Invalid IFSC code</p>}
			</div>
		</div>
	);
};

export default BankDetailsForm;
