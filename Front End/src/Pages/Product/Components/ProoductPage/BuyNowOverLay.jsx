import React from 'react';
import ThemeButtons from '../../../../Components/Buttons/ThemeButton';

const BuyNowOverlay = ({
	product,
	auction,
	highestBid,
	setIsBuyNow,
	manageBuyNow,
	error,
}) => {
	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='relative p-8 rounded-lg shadow-lg min-w-96 w-full max-w-lg bg-sectionBgColour3'>
				{/* Close Button */}
				<button
					onClick={() => setIsBuyNow(false)}
					className='absolute top-2 right-2 text-gray-600 hover:text-gray-900'>
					&times;
				</button>

				<h2 className='text-2xl font-bold mb-6 text-headerColour'>
					Confirm Buy Now?
				</h2>

				<div className='flex justify-center mb-6'>
					{product.images && (
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
							{auction.initial_prize}
						</p>
					</div>

					<div className='flex justify-between items-center'>
						<h1 className='text-headerColour font-semibold'>
							Highest Bid:
						</h1>
						<p className='text-bodyTextColour'>
							{highestBid?.amount || highestBid?.message}
						</p>
					</div>

					{/* Emphasized Buy Now Price */}
					<div className='flex justify-between items-center py-4 px-2 rounded-lg bg-sectionBgColour2 shadow-lg'>
						<h1 className='font-bold text-lg'>Buy now price:</h1>
						<p className='font-bold text-lg'>
							{product.buy_now_prize}
						</p>
					</div>
				</div>

				{/* Error Message */}
				<div
					className={`${
						error ? '' : 'invisible'
					} pt-4 text-errorColour`}>
					<p>{error ? error : 'Buy now errors'}</p>
				</div>

				{/* Buttons */}
				<div className='flex justify-end gap-4 mt-6'>
					<ThemeButtons
						style={21}
						text='Cancel'
						className='py-2 px-4'
						onclick={() => setIsBuyNow(false)}
					/>
					<ThemeButtons
						text='Confirm'
						style={2}
						className='py-2 px-4'
						onclick={manageBuyNow}
					/>
				</div>
			</div>
		</div>
	);
};

export default BuyNowOverlay;
