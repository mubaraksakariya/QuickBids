import React from 'react';
import useAuctionCompletionByCategory from './useAuctionCompletionByCategory';
import { BarChart } from '@mui/x-charts/BarChart';

const AuctionCompletionByCategoryChart = ({ fromDate, toDate }) => {
	const { data, isLoading, isError } = useAuctionCompletionByCategory(
		fromDate,
		toDate
	);

	// extract info from the  data received from the backend
	const { buyNowCounts, bidWonCounts, notActiveCount, categories } = (
		data || []
	).reduce(
		(acc, item) => {
			acc.buyNowCounts.push(item.buy_now_count);
			acc.bidWonCounts.push(item.bid_won_count);
			acc.notActiveCount.push(item.not_active_count);
			acc.categories.push(item.category);
			return acc;
		},
		{
			buyNowCounts: [],
			bidWonCounts: [],
			notActiveCount: [],
			categories: [],
		}
	);

	if (isLoading)
		return (
			<p className='text-center text-lg text-bodyTextColour'>
				Loading...
			</p>
		);
	if (isError)
		return (
			<p className='text-center text-errorColour text-lg'>
				Error fetching data...
			</p>
		);

	return (
		<div className='bg-sectionBgColour5 p-8 rounded-lg shadow-md max-w-2xl mx-auto'>
			<h2 className='text-headerColour text-2xl font-bold mb-6 text-center'>
				Auction Completion by Category
			</h2>
			<div className='overflow-x-auto'>
				<BarChart
					width={500}
					height={300}
					series={[
						{
							data: bidWonCounts,
							label: 'Bid Won',
							id: 'bidWonCounts',
						},
						{
							data: buyNowCounts,
							label: 'Buy Now',
							id: 'buyNowCounts',
						},
						{
							data: notActiveCount,
							label: 'Not Active',
							id: 'notActiveCount',
						},
					]}
					xAxis={[
						{
							data: categories,
							scaleType: 'band',
							label: 'Categories',
							labelStyle: { color: '#333', fontSize: 10 },
						},
					]}
					colors={['#076e05', '#7F265B', '#dc2626']}
				/>
			</div>
		</div>
	);
};

export default AuctionCompletionByCategoryChart;
