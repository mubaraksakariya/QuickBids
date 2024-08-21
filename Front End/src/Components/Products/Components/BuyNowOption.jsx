import React, { useState } from 'react';
import BuyNowOverlay from '../../../Pages/Product/Components/ProoductPage/BuyNowOverLay';
import { useProductContext } from '../../../Context/ProductContext';

function BuyNowOption({ product, auction, highestBid, refetch }) {
	const [isBuyNow, setIsBuyNow] = useState(false);
	const { removeProductById } = useProductContext();
	const isBuyable =
		Number(product.buy_now_prize) > Number(highestBid?.amount) ||
		!highestBid?.amount;
	const openOverLay = () => {
		setIsBuyNow(true);
	};
	const closeOVerLay = () => {
		setIsBuyNow(false);
	};
	const onSuccess = () => {
		setIsBuyNow(false);
		removeProductById(product.id);
		console.log('succefull purchase');
	};

	return (
		<div className=' pb-2'>
			<div className='flex justify-between items-center'>
				<p>Buy now : {product?.buy_now_prize}</p>
				<button
					disabled={!isBuyable}
					onClick={openOverLay}
					type='button'
					className='focus:outline-none text-white bg-buttonColour1 hover:bg-buttonColour2 active:bg-buttonColour3  font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 '>
					Buy Now
				</button>
			</div>
			{isBuyNow && (
				<BuyNowOverlay
					product={product}
					auction={auction}
					highestBid={highestBid}
					onCancel={closeOVerLay}
					onSuccess={onSuccess}
				/>
			)}
		</div>
	);
}

export default BuyNowOption;
