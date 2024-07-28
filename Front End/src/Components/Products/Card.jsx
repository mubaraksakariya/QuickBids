import React, { useState, useEffect, useCallback } from 'react';
import BidNowOption from './HelperComponents/BidNowOption';
import BuyNowOption from './HelperComponents/BuyNowOption';
import TimeRemaining from './HelperComponents/TimeRemaining';
import useAuction from '../../CustomHooks/useAuction';
import useHighestBid from '../../CustomHooks/useHighestBid';
import useUpdateBid from '../../CustomHooks/useUpdateBid';

function Card({ product }) {
	const [isTimeOver, setIsTimeOver] = useState(false);
	const [isBiddingOpen, setIsBiddingOpen] = useState(false);
	const [highestBid, setHighestBid] = useState(null);
	const [highestBidError, setHighestBidError] = useState(null);
	const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

	// get Auction detail for this product
	const {
		data: auction,
		error: auctionError,
		isLoading: isAuctionLoading,
	} = useAuction(product.id);

	// get current highest bid details
	const {
		data: highestBidData,
		error: highestBidErrorData,
		isLoading: isHighestBidLoading,
	} = useHighestBid(auction?.id);

	// to update auction
	const { mutate: updateBid, isLoading: isUpdating } = useUpdateBid();

	useEffect(() => {
		if (highestBidData) setHighestBid(highestBidData);
		if (highestBidErrorData)
			setHighestBidError(highestBidErrorData.response.data.detail);
	}, [highestBidData, highestBidErrorData]);

	const toggleBiddingWindow = useCallback(() => {
		setIsBiddingOpen((prev) => !prev);
	}, []);

	const handleUpdateBid = (newBidAmount) => {
		const bidData = { auctionId: auction.id, amount: newBidAmount };
		updateBid(bidData, {
			onSuccess: (response) => {
				setHighestBid(response);
				toggleBiddingWindow();
			},
			onError: (error) => {
				console.error('Failed to update bid:', error);
			},
		});
	};

	const manageTimeover = () => {
		setIsTimeOver(true);
	};

	const manageProductOpen = (e) => {
		e.preventDefault();
		console.log(product);
	};

	return (
		<div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col'>
			<div
				className='w-full aspect-video overflow-hidden cursor-pointer'
				onClick={manageProductOpen}>
				<img
					className='rounded-t-lg w-full h-full object-cover'
					src={product.images[0].image}
					alt='Card Image'
				/>
			</div>

			<div className='px-5 relative'>
				<div className='border-b mb-2'>
					<a className='cursor-pointer' onClick={manageProductOpen}>
						<h5
							title={product.title}
							className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-wrap overflow-hidden max-h-8'>
							{product.title}
						</h5>
					</a>
					<p
						className='mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3'
						title={product.description}>
						{product.description}
					</p>
				</div>
				<div>
					<div className='flex justify-between pb-2'>
						<p>Starting Bid:</p>
						<p>{auction?.initial_prize}</p>
					</div>
					<TimeRemaining
						bidEndTime={auction?.end_time}
						timerEnded={manageTimeover}
					/>
				</div>
				<div className='pt-4'>
					{!isTimeOver && (
						<BidNowOption
							product={product}
							auction={auction}
							isBiddingOpen={isBiddingOpen}
							highestBid={highestBid}
							highestBidError={highestBidError}
							isHighestBidLoading={isHighestBidLoading}
							toggleBiddingWindow={toggleBiddingWindow}
							handleUpdateBid={handleUpdateBid}
							isUpdating={isUpdating}
						/>
					)}
					<BuyNowOption product={product} highestBid={highestBid} />
				</div>
			</div>
		</div>
	);
}

export default Card;
