import React from 'react';

const CurrentBid = ({ highestBid }) => (
	<div className='flex justify-between items-center'>
		<span className='text-bodyTextColour font-medium'>Current Bid: </span>

		{highestBid?.message && (
			<p className='bg-sectionBgColour2 text-headerColour rounded-lg px-3 py-1 font-semibold shadow-sm'>
				{highestBid.message}
			</p>
		)}

		{highestBid?.amount && (
			<p className='bg-sectionBgColour1 text-headerColour rounded-lg px-3 py-1 font-bold shadow-sm'>
				{highestBid.amount}
			</p>
		)}
	</div>
);

export default CurrentBid;
