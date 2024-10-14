import React, { useState, useCallback } from 'react';
import BiddingOverlay from './BiddingOverlay';
import CurrentBid from './CurrentBid';
import { BidderProfile } from './BidderProfile';
import { useSelector } from 'react-redux';
import ThemeButtons from '../../Buttons/ThemeButton';
import useUpdateBid from '../../../CustomHooks/useUpdateBid';

const BidNowOption = ({
	product,
	auction,
	highestBid,
	highestBidError,
	isHighestBidLoading,
	isTimeOver,
}) => {
	const [isBiddingOpen, setIsBiddingOpen] = useState(false);
	const { mutate: updateBid, isLoading: isUpdating } = useUpdateBid();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	// Toggle bidding window visibility
	const toggleBiddingWindow = useCallback(() => {
		setIsBiddingOpen((prev) => !prev);
	}, []);

	// Handle bid update
	const handleUpdateBid = (newBidAmount) => {
		const bidData = { auctionId: auction.id, amount: newBidAmount };
		updateBid(bidData, {
			onSuccess: (response) => {
				// Ideally, refetch data or set new highest bid here
				toggleBiddingWindow();
			},
		});
	};

	if (isTimeOver) {
		return (
			<div className='pb-4 text-center text-lg font-semibold text-errorColour'>
				Bidding is over
			</div>
		);
	}

	if (!auction?.is_active) {
		return (
			<div className='pb-4 text-center text-lg font-semibold text-errorColour'>
				This auction is not available at the moment
			</div>
		);
	}

	return (
		<div className='pb-2'>
			{highestBid?.amount && isAuthenticated && (
				<CurrentBid highestBid={highestBid} />
			)}
			<section className='flex justify-between items-center'>
				{highestBid?.amount && isAuthenticated ? (
					<BidderProfile user={highestBid?.user} />
				) : (
					<CurrentBid highestBid={highestBid} />
				)}

				<ThemeButtons
					onclick={toggleBiddingWindow}
					disabled={isTimeOver}
					style={3}
					text={highestBid?.amount ? 'Out bid' : 'Bid now'}
					className='font-medium rounded-lg text-sm px-5 py-2.5'
				/>
			</section>

			{isBiddingOpen && (
				<BiddingOverlay
					product={product}
					auction={auction}
					highestBid={highestBid}
					isLoading={isHighestBidLoading}
					isUpdating={isUpdating}
					highestBidError={highestBidError}
					toggleBiddingWindow={toggleBiddingWindow}
					handleUpdateBid={handleUpdateBid}
				/>
			)}
		</div>
	);
};

export default BidNowOption;
