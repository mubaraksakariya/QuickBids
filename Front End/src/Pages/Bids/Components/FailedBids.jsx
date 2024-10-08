import React from 'react';
import useUserAuctions from '../../../CustomHooks/useUserAuctions';
import ActiveUserAuctionCard from './ActiveUserAuctionCard';

function FailedBids() {
	const { data: userAuctions, error, isLoading } = useUserAuctions('failed');
	if (isLoading) return <div>Loading...</div>;
	return (
		<>
			{userAuctions?.message ? (
				<div className='py-2 md:flex-grow flex flex-col justify-center items-center'>
					<div className='md:px-0 px-4 text-center'>
						{userAuctions?.message}
					</div>
				</div>
			) : (
				<div className=' flex justify-center items-center gap-4 flex-wrap'>
					{userAuctions.map((auction) => (
						<ActiveUserAuctionCard
							auction={auction}
							key={auction.id}
						/>
					))}
				</div>
			)}
		</>
	);
}

export default FailedBids;
