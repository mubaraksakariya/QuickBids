import React, { useState } from 'react';
import ThemeButtons from '../../../../Components/Buttons/ThemeButton';
import BuyNowOverlay from './BuyNowOverLay';
import useWallet from '../../../../CustomHooks/useWallet';
import { useSelector } from 'react-redux';
import { useError } from '../../../../Context/ErrorContext';
import { useNavigate } from 'react-router-dom';
import useBuyNow from '../../../../CustomHooks/useBuyNow';

const BuyNowSection = ({ product, auction, highestBid, user }) => {
	const [isBuyNow, setIsBuyNow] = useState(false);
	const { showError, hideError } = useError();
	const [buyNowError, setBuyNowError] = useState(false);
	const navigate = useNavigate();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	const {
		mutate: buyNow,
		isLoading: buyNowLoading,
		isError: isBuyNowError,
		isSuccess: isBuyNowSuccess,
		data: BuyNowData,
		error,
	} = useBuyNow();

	const {
		data: wallet,
		isLoading: walletLoadin,
		error: walletError,
	} = useWallet();

	const openOverLay = () => {
		setBuyNowError(false);
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
	const manageBuyNow = () => {
		setBuyNowError(false);
		if (wallet.balance < product.buy_now_prize) {
			setBuyNowError('You have not enough balance in the wallet !!!');
		}
		buyNow(product.id);
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
					setIsBuyNow={setIsBuyNow}
					auction={auction}
					highestBid={highestBid}
					user={user}
					product={product}
					wallet={wallet}
					manageBuyNow={manageBuyNow}
					error={buyNowError}
				/>
			)}
		</div>
	);
};

export default BuyNowSection;
