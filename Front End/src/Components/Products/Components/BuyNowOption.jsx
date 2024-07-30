import React from 'react';

function BuyNowOption({ product, highestBid }) {
	const isBuyable =
		(Number(product.buy_now_prize) > Number(highestBid?.amount)) |
		!highestBid?.amount;
	const manageBuyNow = () => {
		if (isBuyable) {
			console.log('buy now');
		}
	};
	return (
		<div className=' pb-2'>
			<div className='flex justify-between items-center'>
				<p>Buy now : {product?.buy_now_prize}</p>
				<button
					disabled={!isBuyable}
					onClick={manageBuyNow}
					type='button'
					className='focus:outline-none text-white bg-buttonColour1 hover:bg-buttonColour2 active:bg-buttonColour3  font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 '>
					Buy Now
				</button>
			</div>
		</div>
	);
}

export default BuyNowOption;
