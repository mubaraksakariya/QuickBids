import React from 'react';
import ThemeButtons from '../../../../Components/Buttons/ThemeButton';

const BuyNowSection = ({ product }) => (
	<div className='mb-6'>
		<p className='text-lg text-bodyTextColour flex justify-between items-center'>
			<span>Buy Now Price:</span>
			<span className='font-semibold text-linkColour'>
				{product?.buy_now_prize}
			</span>
		</p>
		<div className='flex-1 flex flex-col justify-end'>
			<ThemeButtons text='Buy now' className='mt-4 w-full h-9' />
		</div>
	</div>
);

export default BuyNowSection;
