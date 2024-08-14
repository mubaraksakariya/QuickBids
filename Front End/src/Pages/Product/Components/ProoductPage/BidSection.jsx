import React from 'react';
import ThemeButtons from '../../../../Components/Buttons/ThemeButton';

const BidSection = ({ highestBid, auction }) => (
	<div className='mb-6'>
		<p className='text-xl text-bodyTextColour mb-3'>
			Current bid:{' '}
			<span className='font-semibold text-linkColour'>
				{highestBid?.amount
					? `${highestBid.amount}`
					: 'Be the first one to bid !!'}
			</span>
		</p>
		<label htmlFor='bid-now' className='text-sm'>
			Your bid
		</label>
		<div className='flex gap-4'>
			<input
				defaultValue={
					highestBid?.amount
						? highestBid.amount
						: auction?.initial_prize
				}
				type='number'
				id='bid-now'
				placeholder='Enter your bid'
				className='border border-cardBorderColour rounded-lg py-2 px-4 w-full flex-[8]'
			/>
			<ThemeButtons text='Bid Now' className='flex-[4]' />
		</div>
	</div>
);

export default BidSection;
