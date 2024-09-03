import React from 'react';

const ProductTable = ({ auctions, sorting, setSorting }) => {
	const truncateText = (text, maxLength) => {
		if (text.length > maxLength) {
			return `${text.substring(0, maxLength)}...`;
		}
		return text;
	};
	// Function to handle header click
	const handleSort = (field) => {
		setSorting((prevSorting) => {
			// Toggle order if the same field is clicked
			const order =
				prevSorting.field === field && prevSorting.order === 'asc'
					? 'desc'
					: 'asc';
			return { field, order };
		});
	};

	// Helper to display sort indicator
	const renderSortIndicator = (field) => {
		if (sorting.field === field) {
			return sorting.order === 'asc' ? '▲' : '▼';
		}
		return '';
	};
	const manageEdit = (auction) => {
		console.log(auction);
	};
	return (
		<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
			<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
				<tr>
					<th
						scope='col'
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('product__title')}>
						<div className=' flex justify-between'>
							<span>Title</span>
							<span>{renderSortIndicator('product__title')}</span>
						</div>
					</th>
					<th
						scope='col'
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
						scope='col'
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('product__owner')}>
						<div className='flex justify-between'>
							<span>Owner</span>
							<span>{renderSortIndicator('product__owner')}</span>
						</div>
					</th>
					<th
						scope='col'
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('product__buy_now_prize')}>
						<div className=' flex justify-between'>
							<span>Buy Now Price </span>
							<span>
								{renderSortIndicator('product__buy_now_prize')}
							</span>
						</div>
					</th>
					<th
						scope='col'
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('initial_prize')}>
						<div className='flex justify-between'>
							<span>Initial Auction Price </span>
							<span>{renderSortIndicator('initial_prize')}</span>
						</div>
					</th>
					<th
						scope='col'
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('start_time')}>
						<div className='flex justify-between'>
							<span>Start Date</span>
							<span>{renderSortIndicator('start_time')}</span>
						</div>
					</th>
					<th
						scope='col'
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('end_time')}>
						<div className='flex justify-between'>
							<span>End Date</span>
							<span>{renderSortIndicator('end_time')}</span>
						</div>
					</th>
					<th
						scope='col'
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('product__current_location')}>
						<div className='flex justify-between'>
							<span>Location </span>
							<span>
								{renderSortIndicator(
									'product__current_location'
								)}
							</span>
						</div>
					</th>
					<th
						scope='col'
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('is_active')}>
						<div className='flex justify-between'>
							<span>Auction Status</span>
							<span>{renderSortIndicator('is_active')}</span>
						</div>
					</th>
					<th scope='col' className='px-6 py-3'>
						Actions
					</th>
				</tr>
			</thead>
			<tbody>
				{/* Assume auctions is passed as a prop after fetching */}
				{auctions?.map((auction) => (
					<tr
						key={auction.id}
						className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
						<td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
							<span title={auction.product.title}>
								{truncateText(auction.product.title, 15)}
							</span>
						</td>
						<td className='px-6 py-4'>
							{auction.product.category.name}
						</td>
						<td className='px-6 py-4'>
							{auction.product.owner.first_name}
						</td>
						<td className='px-6 py-4'>
							${auction.product.buy_now_prize}
						</td>
						<td className='px-6 py-4'>${auction.initial_prize}</td>
						<td className='px-6 py-4'>
							{new Date(auction.start_time).toLocaleDateString()}
						</td>
						<td className='px-6 py-4'>
							{new Date(auction.end_time).toLocaleDateString()}
						</td>
						<td className='px-6 py-4'>
							{auction.product.current_location
								? auction.product.current_location.city
								: auction.product.selected_state}
						</td>
						<td className='px-6 py-4'>
							<span
								className={`${
									auction.is_active
										? 'text-green-600'
										: 'text-red-600'
								} font-semibold`}>
								{auction.is_active ? 'Active' : 'Inactive'}
							</span>
						</td>
						<td className='px-6 py-4 text-right'>
							<button
								className='text-blue-600 dark:text-blue-500 hover:underline'
								onClick={() => manageEdit(auction)}>
								Edit
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default ProductTable;
