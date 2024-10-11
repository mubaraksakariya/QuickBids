import React from 'react';
import useHighestBid from '../../../../CustomHooks/useHighestBid';

const ProductDetails = ({ auction }) => {
	const {
		data: highestBid,
		error: highestBidError,
		isLoading: highestBidLoading,
	} = useHighestBid(auction?.id);

	// if (highestBid) console.log(highestBid);

	return (
		<div className='bg-sectionBgColour5 p-6 rounded-lg shadow-lg'>
			<h1 className='text-2xl font-semibold text-headerColour mb-4'>
				Auction Details
			</h1>
			<div className='mb-4'>
				<h2 className='text-lg font-medium text-bodyTextColour'>
					Product Title: {auction?.product.title}
				</h2>
				<p className='text-sm text-bodyTextColour'>
					Category: {auction?.product.category.name}
				</p>
				<p className='text-sm text-bodyTextColour'>
					Description: {auction?.product.description}
				</p>
			</div>
			<div className='mb-4'>
				<h2 className='text-lg font-medium text-bodyTextColour'>
					Buy Now Price: {auction?.product.buy_now_prize}
				</h2>
				<p className='text-sm text-bodyTextColour'>
					Initial Bid Price: {auction?.initial_prize}
				</p>
				<p className='text-sm text-bodyTextColour'>
					Highest Bid:{' '}
					{highestBidLoading
						? 'Loading...'
						: highestBidError
						? 'Error loading bid'
						: highestBid?.amount
						? `${highestBid.amount}`
						: 'No bids yet'}
				</p>
			</div>
			<div className='mb-4'>
				<h2 className='text-lg font-medium text-bodyTextColour'>
					Auction Status: {auction?.is_active ? 'Active' : 'Inactive'}
				</h2>
				<p className='text-sm text-bodyTextColour'>
					Auction Starts:{' '}
					{new Date(auction?.start_time).toLocaleDateString()}
				</p>
				<p className='text-sm text-bodyTextColour'>
					Auction Ends:{' '}
					{new Date(auction?.end_time).toLocaleDateString()}
				</p>
			</div>
			<div className='mb-4'>
				<h2 className='text-lg font-medium text-bodyTextColour'>
					Total Bids: {auction?.total_bids}
				</h2>
				<p className='text-sm text-bodyTextColour'>
					Number of Watchers: {auction?.watchers_count}
				</p>
			</div>
		</div>
	);
};

export default ProductDetails;
