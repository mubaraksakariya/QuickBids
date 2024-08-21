import React from 'react';
import BiddingOverlay from './BiddingOverlay';
import CurrentBid from './CurrentBid';
import { BidderProfile } from './BidderProfile';
import { useSelector } from 'react-redux';

const BidNowOption = ({
	product,
	auction,
	isBiddingOpen,
	highestBid,
	highestBidError,
	isHighestBidLoading,
	toggleBiddingWindow,
	handleUpdateBid,
	isUpdating,
	isTimeOver,
}) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
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
				<button
					disabled={isTimeOver}
					onClick={toggleBiddingWindow}
					type='button'
					className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 ${
						isTimeOver
							? 'bg-button2Colour3'
							: ' bg-button2Colour1 hover:bg-button2Colour2 active:bg-button2Colour3'
					}`}>
					{highestBid?.amount ? 'Out bid' : 'Bid now'}
				</button>
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
