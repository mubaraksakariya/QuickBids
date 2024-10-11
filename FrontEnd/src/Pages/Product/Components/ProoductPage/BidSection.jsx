import React, { useState } from 'react';
import ThemeButtons from '../../../../Components/Buttons/ThemeButton';
import useUpdateBid from '../../../../CustomHooks/useUpdateBid';
import { useError } from '../../../../Context/ErrorContext';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GeneralModal from '../../../../Components/Models/GeneralModal';
import { UserInfo } from './UserInfo';

const BidSection = ({ highestBid, auction }) => {
	const [bidAmount, setBidAmount] = useState(null);
	const [error, setError] = useState();
	const [showSuccess, setShowSuccess] = useState(false);
	const { showError, hideError } = useError('');
	const user = highestBid?.user;
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
		<div className='mb-6 p-6 bg-sectionBgColour3 rounded-lg shadow-md'>
			<div className='flex justify-between mb-4'>
				<p className='text-xl font-semibold text-headerColour'>
					Initial Prize
				</p>
				<span className='text-lg font-semibold text-linkColour'>
					{auction?.initial_prize?.toLocaleString()}
				</span>
			</div>
			<div className=' text-headerColour mb-4'>
				<h1 className='pb-3 text-xl font-semibold'>Current Bid</h1>
				<div className='font-semibold text-linkColour'>
					{highestBid?.amount ? (
						<UserInfo user={user} highestBid={highestBid} />
					) : (
						<span className=' font-normal text-black'>
							Be the first one to bid !!
						</span>
					)}
				</div>
			</div>
			<label
				htmlFor='bid-now'
				className='block text-sm text-headerColour mb-2'>
				Your Bid
			</label>
			<div className='md:flex gap-4'>
				<div className='flex-[8]'>
					<input
						onChange={(e) => setBidAmount(e.target.value)}
						type='number'
						id='bid-now'
						placeholder={
							highestBid?.amount
								? highestBid.amount
								: auction?.initial_prize
						}
						className='border border-cardBorderColour rounded-lg py-2 px-4 w-full  text-headerColour focus:ring-2 focus:ring-linkHoverColour'
						disabled={isLoading}
						min={
							highestBid?.amount
								? highestBid.amount
								: auction?.initial_prize
						}
					/>
					{error && <p className='text-errorColour mt-2'>{error}</p>}
				</div>
				<div className='md:mt-0 mt-3 flex-[4]'>
					<ThemeButtons
						text={isLoading ? 'Submitting...' : 'Bid Now'}
						className=' text-white rounded-lg py-2 px-4 w-full'
						style={14}
						onclick={handleBidSubmit}
						disabled={isLoading}
					/>
				</div>
			</div>

			<GeneralModal
				show={showSuccess}
				onClose={() => setShowSuccess(false)}>
				<p className='text-headerColour'>
					Your bid is updated successfully!
				</p>
			</GeneralModal>
		</div>
	);
};

export default BidSection;
