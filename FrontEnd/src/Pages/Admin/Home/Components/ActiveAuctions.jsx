import React from 'react';
import useActiveAuctions from '../../../../CustomHooks/useActiveAuctions';

const ActiveAuctions = () => {
	const { data: activeAuctions, isLoading, error } = useActiveAuctions();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	const getTotalPoints = () => {
		let total = 0;
		activeAuctions.forEach((element) => {
			total = total + Number(element.product.buy_now_prize);
		});
		return total;
	};
	return (
		<div className='flex justify-between items-center p-4 bg-sectionBgColour5 border border-cardBorderColour rounded-lg shadow-sm'>
			<div className='flex gap-3 items-center'>
				<div className='bg-blue-400  p-3 rounded-full'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='size-6 text-white'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z'
						/>
					</svg>
				</div>
				<div>
					<h1 className='text-lg font-semibold text-headerColour'>
						Active Auctions
					</h1>
					<p className='text-sm text-bodyTextColour'>
						count : {activeAuctions.length}
					</p>
				</div>
			</div>
			<div className='text-sm text-bodyTextColour'>
				<div>Total Points</div>
				<div>{getTotalPoints()}</div>
			</div>
		</div>
	);
};

export default ActiveAuctions;
