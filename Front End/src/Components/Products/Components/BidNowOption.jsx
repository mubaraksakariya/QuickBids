import React from 'react';
import BiddingOverlay from './BiddingOverlay';
import CurrentBid from './CurrentBid';

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
	return (
		<div className='pb-2'>
			<section className='flex justify-between items-center'>
				<CurrentBid
					isLoading={isHighestBidLoading}
					highestBidError={highestBidError}
					highestBid={highestBid}
				/>
				<button
					disabled={isTimeOver}
					onClick={toggleBiddingWindow}
					type='button'
					className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 ${
						isTimeOver
							? 'bg-button2Colour3'
							: ' bg-button2Colour1 hover:bg-button2Colour2 active:bg-button2Colour3'
					}`}>
					Bid Now
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
