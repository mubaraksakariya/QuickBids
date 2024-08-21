import React from 'react';

const CurrentBid = ({ highestBid }) => (
	<div className='flex justify-between items-center pb-2'>
		<span className='text-bodyTextColour font-bold'>Current Bid:</span>

		{highestBid?.message && (
			<p className=' text-headerColour rounded-lg px-3 py-1 font-semibold'>
				{highestBid.message}
			</p>
		)}

		{highestBid?.amount && (
			<p className=' text-headerColour rounded-lg px-3 py-1 font-bold'>
				{highestBid.amount}
			</p>
		)}
	</div>
);

export default CurrentBid;
