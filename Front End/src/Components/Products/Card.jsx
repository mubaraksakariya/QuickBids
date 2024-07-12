import React from 'react';
import BidNowOption from './HelperComponents/BidNowOption';
import BuyNowOption from './HelperComponents/BuyNowOption';
import TimeRemaining from './HelperComponents/TimeRemaining';

function Card() {
	return (
		<div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
			<div className='w-full aspect-video overflow-hidden'>
				<img
					className='rounded-t-lg w-full h-full object-cover'
					src='./QuickbidsAd.png'
					alt='Card Image'
				/>
			</div>

			<div className='p-5 relative'>
				<div className=''>
					<a href='#'>
						<h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
							Product Name
						</h5>
					</a>
					<p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
						Here are the biggest enterprise technology acquisitions
						of 2021 so far, in reverse chronological order.
					</p>
					<div className='flex justify-between pb-2'>
						<p>Starting Bid:</p>
						<p>Rs 100</p>
					</div>
					<TimeRemaining />
				</div>
				<div className='pt-4'>
					<BidNowOption />
					<BuyNowOption />
				</div>
			</div>
		</div>
	);
}

export default Card;
