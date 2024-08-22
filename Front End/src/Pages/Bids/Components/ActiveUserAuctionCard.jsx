import React from 'react';
import TimeRemaining from '../../../Components/Products/Components/TimeRemaining';
import useHighestBid from '../../../CustomHooks/useHighestBid';
import { useNavigate } from 'react-router-dom';

function ActiveUserAuctionCard({ auction }) {
	const product = auction.product;
	const navigate = useNavigate();
	// get current highest bid details
	const {
		data: highestBidData,
		error: highestBidErrorData,
		isLoading: isHighestBidLoading,
	} = useHighestBid(auction?.id);
	const manageProductOpen = (e) => {
		e.preventDefault();
		navigate(`/product/${product.id}`);
	};

	// if (isLoading) return <div>Loading...</div>;
	// if (error) return <div>Error loading product: {error.message}</div>;
	if (!product) return <div>Product not found.</div>;
	return (
		<div className='card  max-w-[20rem] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col'>
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
					<div className='flex justify-between pb-2'>
						<p>Current Bid:</p>
						{highestBidData?.amount ? (
							<p>{highestBidData?.amount}</p>
						) : (
							<p>{highestBidData?.message}</p>
						)}
					</div>
					{!!auction.winner && (
						<TimeRemaining
							endTime={auction?.end_time}
							timerEnded={() => {}}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default ActiveUserAuctionCard;
