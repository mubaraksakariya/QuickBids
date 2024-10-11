import React from 'react';
import useHighestBidByUser from '../../../CustomHooks/useHighestBidByUser';

const AuctionUserIndicator = ({
	highestBidder,
	currentUser,
	auction,
	highestBid,
}) => {
	const {
		data: userHighestBid,
		error: userHighestBidErro,
		isLoading: userHighestBidLoading,
	} = useHighestBidByUser(auction?.id, currentUser?.id);

	const getStatusColor = () => {
		if (highestBidder?.email == currentUser?.email)
			return 'bg-green-500 text-white';
		return 'bg-slate-500 text-white';
	};

	const manageOpenProfile = () => {
		console.log(highestBidder);
	};

	if (userHighestBid?.amount | highestBid?.amount && highestBidder)
		return (
			<div
				className={`inline-flex items-center px-1 py-1 rounded-tr-xl text-sm font-semibold shadow-2xl transition-all duration-300 cursor-pointer ${getStatusColor()}`}
				onClick={manageOpenProfile}>
				<span className=''>
					<div className='flex items-center gap-2'>
						{highestBidder?.profile_picture ? (
							<img
								className='w-5 h-5 rounded-full'
								src={highestBidder?.profile_picture}
								alt=''
							/>
						) : (
							<div>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='size-6'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
									/>
								</svg>
							</div>
						)}
						<div className=' text-xs dark:text-white'>
							<div>{highestBidder?.first_name}</div>
						</div>
					</div>
				</span>
			</div>
		);
};

export default AuctionUserIndicator;
