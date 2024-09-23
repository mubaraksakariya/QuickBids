import React, { useState } from 'react';
import BuyNowOverlay from '../../../Pages/Product/Components/ProoductPage/BuyNowOverLay';
import { useProductContext } from '../../../Context/ProductContext';
import ThemeButtons from '../../Buttons/ThemeButton';

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
				<p>
					Buy now :{' '}
					<span className=' font-bold bg-sectionBgColour1 rounded-lg px-3 py-1 shadow-sm'>
						{product?.buy_now_prize}
					</span>
				</p>
				<ThemeButtons
					onclick={openOverLay}
					disabled={!isBuyable}
					style={9}
					text='Buy Now'
					className='font-medium rounded-lg text-sm px-5 py-2.5'
				/>
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
