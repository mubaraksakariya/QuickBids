import React from 'react';

const SalesTable = ({ sales, sorting, setSorting }) => {
	// Helper to truncate text for longer strings
	const truncateText = (text, maxLength) => {
		if (text.length > maxLength) {
			return `${text.substring(0, maxLength)}...`;
		}
		return text;
	};

	// Function to handle sorting
	const handleSort = (field) => {
		setSorting((prevSorting) => {
			const order =
				prevSorting.field === field && prevSorting.order === 'asc'
					? 'desc'
					: 'asc';
			return { field, order };
		});
	};

	// Helper to display sorting indicator
	const renderSortIndicator = (field) => {
		if (sorting.field === field) {
			return sorting.order === 'asc' ? '▲' : '▼';
		}
		return '';
	};

	return (
		<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
			<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
				<tr>
					<th
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('product__title')}>
						<div className='flex justify-between'>
							<span>Product</span>
							<span>{renderSortIndicator('product__title')}</span>
						</div>
					</th>
					<th
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('product__category')}>
						<div className='flex justify-between'>
							<span>Category</span>
							<span>
								{renderSortIndicator('product__category')}
							</span>
						</div>
					</th>
					<th
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('initial_prize')}>
						<div className='flex justify-between'>
							<span>Initial Price</span>
							<span>{renderSortIndicator('initial_prize')}</span>
						</div>
					</th>
					<th
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('buy_now_prize')}>
						<div className='flex justify-between'>
							<span>Buy Now Price</span>
							<span>{renderSortIndicator('buy_now_prize')}</span>
						</div>
					</th>
					<th
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('winning_bid')}>
						<div className='flex justify-between'>
							<span>Winning Amount</span>
							<span>{renderSortIndicator('winning_bid')}</span>
						</div>
					</th>
					<th
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('winner')}>
						<div className='flex justify-between'>
							<span>Winner</span>
							<span>{renderSortIndicator('winner')}</span>
						</div>
					</th>
					<th
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('product__owner')}>
						<div className='flex justify-between'>
							<span>Owner</span>
							<span>{renderSortIndicator('product__owner')}</span>
						</div>
					</th>
					<th
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('end_time')}>
						<div className='flex justify-between'>
							<span>End date</span>
							<span>{renderSortIndicator('end_time')}</span>
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				{sales?.map((auction) => (
					<tr
						key={auction.id}
						className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
						<td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
							<span title={auction.product.title}>
								{truncateText(auction.product.title, 20)}
							</span>
						</td>
						<td className='px-6 py-4'>
							{auction.product.category.name}
						</td>
						<td className='px-6 py-4'>{auction.initial_prize}</td>
						<td className='px-6 py-4'>
							{auction.product.buy_now_prize || '-'}
						</td>
						<td className='px-6 py-4'>
							{/* Display winning amount: either final bid or buy now price */}
							{auction.winning_bid
								? auction.winning_bid.amount
								: auction.product.buy_now_prize}
						</td>

						<td
							className='px-6 py-4'
							title={auction.winner ? auction.winner.email : '-'}>
							{auction.winner
								? truncateText(auction.winner.email, 15)
								: '-'}
						</td>
						<td className='px-6 py-4'>
							{auction.product.owner.first_name}{' '}
							{auction.product.owner.last_name}
						</td>
						<td className='px-6 py-4'>
							{new Date(auction.end_time).toLocaleDateString()}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default SalesTable;
