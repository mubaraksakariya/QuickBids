import React from 'react';
import ThemeButtons from '../../../../Components/Buttons/ThemeButton';

const ProxyBidSection = () => (
	<div className='mb-6'>
		<p className='text-xl text-bodyTextColour mb-3'>
			We can take care of your Bid for you !!
		</p>
		<div className='flex flex-col md:flex-row gap-4'>
			<div className='flex-1'>
				<label
					htmlFor='proxy-bid'
					className='block text-sm text-gray-600 mb-2'>
					Maximum amount
				</label>
				<input
					id='proxy-bid'
					type='number'
					placeholder='Max proxy'
					className='border border-cardBorderColour rounded-lg py-2 px-3 w-full'
				/>
			</div>
			<div className='flex-1'>
				<label
					htmlFor='incriment'
					className='block text-sm text-gray-600 mb-2'>
					Increment
				</label>
				<input
					id='incriment'
					type='number'
					placeholder='Proxy increment'
					className='border border-cardBorderColour rounded-lg py-2 px-3 w-full'
				/>
			</div>
		</div>
		<div className='flex-1 flex flex-col justify-end'>
			<ThemeButtons text='Set Proxy Bid' className='mt-4 w-full h-9' />
		</div>
	</div>
);

export default ProxyBidSection;
