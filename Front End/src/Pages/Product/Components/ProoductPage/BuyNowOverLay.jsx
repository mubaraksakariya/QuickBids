import React, { useEffect, useState } from 'react';
import ThemeButtons from '../../../../Components/Buttons/ThemeButton';
import { useSelector } from 'react-redux';
import useWallet from '../../../../CustomHooks/useWallet';
import useBuyNow from '../../../../CustomHooks/useBuyNow';
import { useError } from '../../../../Context/ErrorContext';
import GeneralModal from '../../../../Components/Models/GeneralModal';

const BuyNowOverlay = ({
	product,
	auction,
	highestBid,
	setIsBuyNow,
	onSuccess,
	onError,
	onCancel,
}) => {
	const { showError, hideError } = useError();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const [isSuccess, setIsSuccess] = useState(false);

	const {
		mutate: buyNow,
		isLoading: buyNowLoading,
		isError: isBuyNowError,
		isSuccess: isBuyNowSuccess,
		error: buyNowError,
	} = useBuyNow();

	const {
		data: wallet,
		isLoading: walletLoading,
		error: walletError,
	} = useWallet();

	const isBuyable =
		Number(product.buy_now_prize) > Number(highestBid?.amount) ||
		!highestBid?.amount;

	useEffect(() => {
		if (isBuyNowSuccess) {
			setIsSuccess(true);
		} else if (isBuyNowError) {
			onError && onError(buyNowError);
			showError(buyNowError.message);
		}
	}, [isBuyNowSuccess, isBuyNowError, buyNowError]);

	const manageBuyNow = () => {
		if (!isAuthenticated) {
			showError('Please login to proceed with the purchase.');
			setTimeout(() => {
				navigate('/login', {
					state: { from: window.location.pathname },
				});
				hideError();
			}, 3000);
			return;
		}

		if (!isBuyable) {
			showError('This product is no longer available for "Buy Now".');
			return;
		}

		if (Number(wallet?.balance) < Number(product?.buy_now_prize)) {
			showError('Insufficient wallet balance to complete this purchase.');
			return;
		}
		buyNow(product?.id);
	};

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='relative p-8 rounded-lg shadow-lg min-w-96 w-full max-w-lg bg-sectionBgColour3'>
				{/* Close Button */}
				<button
					onClick={() => onCancel()}
					className='absolute top-2 right-2 text-gray-600 hover:text-gray-900'>
					&times;
				</button>

				<h2 className='text-2xl font-bold mb-6 text-headerColour'>
					Confirm Buy Now?
				</h2>

				{/* Product Image */}
				<div className='flex justify-center mb-6'>
					{product?.images && (
						<div className='aspect-square w-48 rounded-lg overflow-hidden shadow-md'>
							<img
								src={product.images[0].image}
								alt={product.title}
								className='object-cover w-full h-full'
							/>
						</div>
					)}
				</div>

				{/* Product Details */}
				<div className='space-y-4'>
					<div className='flex justify-between items-center'>
						<h1 className='text-headerColour font-semibold'>
							Product Title:
						</h1>
						<p className='text-bodyTextColour'>{product.title}</p>
					</div>

					<div className='flex justify-between items-center'>
						<h1 className='text-headerColour font-semibold'>
							Auction Base Price:
						</h1>
						<p className='text-bodyTextColour'>
							{auction?.initial_prize}
						</p>
					</div>

					<div className='flex justify-between items-center'>
						<h1 className='text-headerColour font-semibold'>
							Highest Bid:
						</h1>
						<p className='text-bodyTextColour'>
							{highestBid?.amount ||
								highestBid?.message ||
								'No bids yet'}
						</p>
					</div>

					{/* Emphasized Buy Now Price */}
					<div className='flex justify-between items-center py-4 px-2 rounded-lg bg-sectionBgColour2 shadow-lg'>
						<h1 className='font-bold text-lg'>Buy Now Price:</h1>
						<p className='font-bold text-lg'>
							{product.buy_now_prize}
						</p>
					</div>
				</div>

				{/* Error Message */}
				{(isBuyNowError || buyNowError) && (
					<div className='pt-4 text-errorColour'>
						<p>
							{buyNowError?.message ||
								'An error occurred while processing your request.'}
						</p>
					</div>
				)}

				{/* Buttons */}
				<div className='flex justify-end gap-4 mt-6'>
					<ThemeButtons
						style={21}
						text='Cancel'
						className='py-2 px-4'
						onclick={() => onCancel()}
					/>
					<ThemeButtons
						text='Confirm'
						style={2}
						className='py-2 px-4'
						onclick={manageBuyNow}
						disabled={buyNowLoading || walletLoading}
					/>
				</div>
			</div>

			<GeneralModal
				show={isSuccess}
				onClose={() => {
					setIsSuccess(false);
					onSuccess();
				}}
				autoCloseAfter={5000}>
				<p>Your purchase was successful !!</p>
			</GeneralModal>
		</div>
	);
};

export default BuyNowOverlay;
