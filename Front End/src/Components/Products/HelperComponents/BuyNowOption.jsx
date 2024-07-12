import React from 'react';

function BuyNowOption() {
	return (
		<div className=' pb-2'>
			<section className='flex justify-between items-center'>
				<p>Buy now : Rs500</p>
				<button
					type='button'
					className='focus:outline-none text-white bg-buttonColour1 hover:bg-buttonColour2 active:bg-buttonColour3  font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 '>
					Buy Now
				</button>
			</section>
		</div>
	);
}

export default BuyNowOption;
