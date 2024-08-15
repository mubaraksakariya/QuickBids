import React, { useState } from 'react';
import ThemeButtons from '../../../../Components/Buttons/ThemeButton';
import useUpdateBid from '../../../../CustomHooks/useUpdateBid';
import { useError } from '../../../../Context/ErrorContext';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GeneralModal from '../../../../Components/Models/GeneralModal';

const BidSection = ({ highestBid, auction }) => {
	const [bidAmount, setBidAmount] = useState(null);
	const [error, setError] = useState();
	const [showSuccess, setShowSuccess] = useState(false);
	const { showError, hideError } = useError('');
	const {
		mutate: updateBid,
		isLoading,
		isError,
		error: updateError,
	} = useUpdateBid();

	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const navigate = useNavigate();

	const handleBidSubmit = () => {
		setError('');
		if (!isAuthenticated) {
			showError('Please login in order to place a bid');
			setTimeout(() => {
				navigate('/login', {
					state: { from: window.location.pathname },
				});
				hideError();
			}, 3000);
			return;
		}

		if (!bidAmount) {
			setError('Enter a valid value');
			return;
		}
		if (highestBid?.amount && Number(bidAmount) <= highestBid?.amount) {
			setError('Please enter a valid bid higher than the highest bid');
			return;
		}
		if (
			auction?.initial_prize &&
			Number(bidAmount) < auction?.initial_prize
		) {
			setError(
				'Please enter a valid bid higher than or equal to the initial prize'
			);
			return;
		}
		updateBid(
			{
				auctionId: auction.id,
				amount: bidAmount,
			},
			{
				onSuccess: (e) => setShowSuccess(true),
			}
		);
	};

	return (
		<div className='mb-6'>
			<p className='text-xl text-bodyTextColour mb-3'>
				Initial Prize :{' '}
				<span className='font-semibold text-linkColour'>
					{auction?.initial_prize}
				</span>
			</p>
			<p className='text-xl text-bodyTextColour mb-3'>
				Current bid:{' '}
				<span className='font-semibold text-linkColour'>
					{highestBid?.amount
						? `${highestBid?.amount}`
						: 'Be the first one to bid !!'}
				</span>
			</p>
			<label htmlFor='bid-now' className='text-sm'>
				Your bid
			</label>
			<div className='flex gap-4'>
				<input
					onChange={(e) => setBidAmount(e.target.value)}
					type='number'
					id='bid-now'
					placeholder={
						highestBid?.amount
							? highestBid.amount
							: auction?.initial_prize
					}
					className='border border-cardBorderColour rounded-lg py-2 px-4 w-full flex-[8]'
					disabled={isLoading}
					min={
						highestBid?.amount
							? highestBid.amount
							: auction?.initial_prize
					}
				/>
				<ThemeButtons
					text={isLoading ? 'Submitting...' : 'Bid Now'}
					className='flex-[4]'
					onclick={handleBidSubmit}
					disabled={isLoading}
				/>
			</div>
			{error && <p className='text-red-500 mt-2'>{error}</p>}{' '}
			<GeneralModal
				show={showSuccess}
				onClose={() => setShowSuccess(false)}>
				Your bid is updated succesfully !!
			</GeneralModal>
		</div>
	);
};

export default BidSection;
