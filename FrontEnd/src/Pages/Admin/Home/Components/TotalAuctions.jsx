import React from 'react';
import useTotalAuctions from '../../../../CustomHooks/useTotalAuctions';

const TotalAuctions = () => {
	const { data: totalAuctions, isLoading, error } = useTotalAuctions();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className='flex justify-between items-center p-4 bg-sectionBgColour5 border border-cardBorderColour rounded-lg shadow-sm'>
			<div className='flex gap-3 items-center'>
				<div className='bg-red-400 p-3 rounded-full'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6 text-white'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M3 12h18M3 6h18M3 18h18'
						/>
					</svg>
				</div>
				<div>
					<h1 className='text-lg font-semibold text-headerColour'>
						Total Auctions
					</h1>
					<p className='text-sm text-bodyTextColour'>
						count : {totalAuctions?.count}
					</p>
				</div>
			</div>
			<div className='text-sm text-bodyTextColour'>
				<div>Total estimate</div>
				<div>{totalAuctions.amount}</div>
			</div>
		</div>
	);
};

export default TotalAuctions;
