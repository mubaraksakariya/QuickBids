import React, { useState, useEffect, useCallback } from 'react';
import BidNowOption from './Components/BidNowOption';
import BuyNowOption from './Components/BuyNowOption';
import TimeRemaining from './Components/TimeRemaining';
import useAuction from '../../CustomHooks/useAuction';
import useHighestBid from '../../CustomHooks/useHighestBid';
import useUpdateBid from '../../CustomHooks/useUpdateBid';
import useWebSocket from '../../CustomHooks/useWebSocket';
import { useSelector } from 'react-redux';
import AuctionStatusIndicator from './Components/AuctionStatusIndicator';
import AuctionUserIndicator from './Components/AuctionUserIndicator';
import useUserById from '../../CustomHooks/useUserById';
import { useNavigate } from 'react-router-dom';

function Card({ product }) {
	const [isTimeOver, setIsTimeOver] = useState(false);
	const [isBiddingOpen, setIsBiddingOpen] = useState(false);
	const [highestBid, setHighestBid] = useState(null);
	const [highestBidError, setHighestBidError] = useState(null);
	const navigate = useNavigate();
	const user = useSelector((state) => state.auth.user);

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

	// get highest bidder user
	const {
		data: highestBidder,
		error: highestBidderError,
		isLoading: highestBidderLoading,
	} = useUserById(highestBid?.user);

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
		});
	};

	const manageTimeover = () => {
		setIsTimeOver(true);
	};

	const manageProductOpen = (e) => {
		e.preventDefault();
		navigate(`/product/${product.id}`);
	};

	//For web socket
	const socketUrl = `auction/${auction?.id}/`;
	const socketKey = `auction-${auction?.id}`;

	// const handleOpen = () => {
	// 	console.log(`Connected to auction ${auction?.id}`);
	// };

	// const handleClose = () => {
	// 	console.log(`Disconnected from auction ${auction?.id}`);
	// };

	// const handleError = (error) => {
	// 	console.log('WebSocket error:', error);
	// };

	// WebSocket message handler
	const handleMessage = (event) => {
		const message = JSON.parse(event.data);
		const data = message.data;
		// console.log(data);
		const new_bid = data.bid;
		if (data.message_type == 'bid_update' && new_bid) {
			setHighestBid(new_bid);
		}
	};

	// Use the WebSocket hook
	useWebSocket(
		socketKey,
		socketUrl,
		handleMessage
		// handleOpen,
		// handleClose,
		// handleError
	);

	return (
		// card, card-header, card-description are custom classes
		<div className='flex justify-center pb-10 relative'>
			<div className='absolute z-50 right-2'>
				<AuctionStatusIndicator
					isActive={auction?.is_active}
					isTimeOver={isTimeOver}
				/>
			</div>
			<div className='card max-w-sm  flex flex-col relative'>
				<div className='absolute z-50 left-0 bottom-0'>
					<AuctionUserIndicator
						currentUser={user}
						highestBidder={highestBidder}
						auction={auction}
						highestBid={highestBid}
					/>
				</div>
				<div
					className='w-full aspect-video overflow-hidden cursor-pointer rounded-t-lg'
					onClick={manageProductOpen}>
					<img
						className='w-full h-full opacity-80 object-contain transition-all duration-200 hover:scale-105 hover:opacity-100'
						src={product.images[0].image}
						alt='Card Image'
					/>
				</div>

				<div className='px-5 py-4 flex flex-col flex-[3] relative'>
					<div className='border-b pb-2 mb-4 flex-grow'>
						<a
							className='cursor-pointer'
							onClick={manageProductOpen}>
							<h5
								title={product.title}
								className='card-header  mb-2 text-xl font-semibold tracking-tight dark:text-white overflow-hidden max-h-8'>
								{product.title}
							</h5>
						</a>
						<p
							className='card-description mb-3 font-normal dark:text-gray-400 line-clamp-3'
							title={product.description}>
							{product.description}
						</p>
					</div>

					<div className='flex-[3]'>
						<div className='flex justify-between pb-2'>
							<p className='text-gray-700 dark:text-gray-400'>
								Starting Bid:
							</p>
							<p className='text-gray-900 dark:text-white'>
								{auction?.initial_prize}
							</p>
						</div>
						<div className='flex justify-between pb-4'>
							<p>Bid ends :</p>
							<TimeRemaining
								endTime={auction?.end_time}
								timerEnded={manageTimeover}
							/>
						</div>
					</div>

					<div className='flex-[3]'>
						<BuyNowOption
							product={product}
							highestBid={highestBid}
						/>
					</div>

					<div className='pt-4 flex-[3]'>
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
							isTimeOver={isTimeOver}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Card;
