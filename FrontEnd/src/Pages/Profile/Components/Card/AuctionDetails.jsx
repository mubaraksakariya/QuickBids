import React from 'react';
import { BidderProfile } from '../../../../Components/Products/Components/BidderProfile';

const AuctionDetails = ({ auction, highestBidData }) => (
	<div className='space-y-2'>
		<div className='flex justify-between'>
			<p className='text-sm font-semibold text-bodyTextColour'>
				Starting Bid:
			</p>
			<p className='text-sm font-semibold text-headerColour'>
				{auction?.initial_prize || 'N/A'}
			</p>
		</div>
		<div className='flex justify-between'>
			<p className='text-sm font-semibold text-bodyTextColour'>
				Current Bid:
			</p>
			{highestBidData?.amount ? (
				<p className='text-sm font-semibold text-headerColour'>
					{highestBidData?.amount}
				</p>
			) : (
				<p className='text-sm text-errorColour'>
					{highestBidData?.message || 'No bids yet'}
				</p>
			)}
		</div>
		{highestBidData?.amount && <BidderProfile user={highestBidData.user} />}
		{!highestBidData?.amount && (
			<div className='min-h-[3rem] flex justify-center items-center'>
				Your product is waiting for bidding
			</div>
		)}
	</div>
);

export default AuctionDetails;
