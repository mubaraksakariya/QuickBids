import React from 'react';
import TimeRemaining from '../../../Components/Products/HelperComponents/TimeRemaining';
import useAuction from '../../../CustomHooks/useAuction';
import useHighestBid from '../../../CustomHooks/useHighestBid';

function ProfileProductCard({ product }) {
	const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

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
	const manageProductOpen = (e) => {
		e.preventDefault();
		console.log(highestBidData);
	};
	return (
		<div className=' max-w-[20rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col'>
			<div
				className='w-full aspect-video overflow-hidden cursor-pointer'
				onClick={manageProductOpen}>
				<img
					className='rounded-t-lg w-full h-full object-cover'
					src={baseUrl + product.images[0].image}
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
					<TimeRemaining bidEndTime={auction?.end_time} />
				</div>
			</div>
		</div>
	);
}

export default ProfileProductCard;
