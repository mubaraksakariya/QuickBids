import React from 'react';
import useAuctionCompletionType from './useAuctionCompletionType';
import { PieChart } from '@mui/x-charts/PieChart';

const AuctionCompletionChart = () => {
	const { data, isLoading, isError } = useAuctionCompletionType();

	if (isLoading)
		return (
			<div className='text-center text-lg text-bodyTextColour'>
				Loading...
			</div>
		);
	if (isError)
		return (
			<div className='text-center text-errorColour text-lg'>
				Error loading data
			</div>
		);

	return (
		<div className='bg-sectionBgColour5 p-8 rounded-lg shadow-md max-w-2xl mx-auto'>
			<h2 className='text-headerColour text-2xl font-bold mb-6 text-center'>
				Auction Completion Types
			</h2>
			<div className='flex justify-center'>
				<PieChart
					series={[
						{
							data: [
								{
									id: 0,
									value: data?.bid_won_count,
									label: 'Bid Won',
								},
								{
									id: 1,
									value: data?.buy_now_count,
									label: 'Buy Now',
								},
								{
									id: 2,
									value: data?.not_active_count,
									label: 'Not Active',
								},
							],
							innerRadius: 40,
							outline: { width: 1, color: '#333' },
						},
					]}
					width={400}
					height={250}
					colors={['#076e05', '#7F265B', '#dc2626']}
				/>
			</div>
		</div>
	);
};

export default AuctionCompletionChart;
