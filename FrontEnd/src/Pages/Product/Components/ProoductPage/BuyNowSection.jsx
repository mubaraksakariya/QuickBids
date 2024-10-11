import React, { useState } from 'react';
import ThemeButtons from '../../../../Components/Buttons/ThemeButton';
import BuyNowOverlay from './BuyNowOverLay';
import { useSelector } from 'react-redux';
import { useError } from '../../../../Context/ErrorContext';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../../../../Context/ProductContext';

const BuyNowSection = ({ product, auction, highestBid, user }) => {
	const [isBuyNow, setIsBuyNow] = useState(false);
	const { showError, hideError } = useError();
	const navigate = useNavigate();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const { removeProductById } = useProductContext();
	const openOverLay = () => {
		if (!isAuthenticated) {
			showError('Please login in order to buy this');
			setTimeout(() => {
				navigate('/login', {
					state: { from: window.location.pathname },
				});
				hideError();
			}, 3000);
			return null;
		}
		setIsBuyNow(true);
	};
	const onSuccess = () => {
		setIsBuyNow(false);
		removeProductById(product.id);
	};
	return (
		<div className='mb-6 p-6 bg-sectionBgColour3 rounded-lg shadow-md'>
			<p className='text-lg text-headerColour flex justify-between items-center mb-4'>
				<span>Buy Now Price:</span>
				<span className='font-semibold text-linkColour'>
					{product?.buy_now_prize}
				</span>
			</p>
			<div className='flex-1 flex flex-col justify-end'>
				<ThemeButtons
					text='Buy Now'
					style={2}
					onclick={openOverLay}
					className='mt-4 text-white rounded-lg py-2 px-4'
				/>
			</div>
			{isBuyNow && (
				<BuyNowOverlay
					product={product}
					auction={auction}
					highestBid={highestBid}
					setIsBuyNow={setIsBuyNow}
					onCancel={() => setIsBuyNow(false)}
					onError={(error) => console.log(error)}
					onSuccess={() => onSuccess()}
				/>
			)}
		</div>
	);
};

export default BuyNowSection;
