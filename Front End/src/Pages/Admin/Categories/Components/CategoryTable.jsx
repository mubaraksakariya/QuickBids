import React from 'react';

const CategoryTable = ({ categories, sorting, setSorting, onEdit }) => {
	// Function to truncate text if it's too long
	const truncateText = (text, maxLength) => {
		if (text.length > maxLength) {
			return `${text.substring(0, maxLength)}...`;
		}
		return text;
	};

	// Function to handle sorting when clicking table headers
	const handleSort = (field) => {
		setSorting((prevSorting) => {
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

	return (
		<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
			<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
				<tr>
					<th
						scope='col'
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('name')}>
						<div className='flex justify-between'>
							<span>Name</span>
							<span>{renderSortIndicator('name')}</span>
						</div>
					</th>
					<th
						scope='col'
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('created_by')}>
						<div className='flex justify-between'>
							<span>Created By</span>
							<span>{renderSortIndicator('created_by')}</span>
						</div>
					</th>
					<th
						scope='col'
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('created_at')}>
						<div className='flex justify-between'>
							<span>Created At</span>
							<span>{renderSortIndicator('created_at')}</span>
						</div>
					</th>
					<th
						scope='col'
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('updated_at')}>
						<div className='flex justify-between'>
							<span>Updated At</span>
							<span>{renderSortIndicator('updated_at')}</span>
						</div>
					</th>
					<th
						scope='col'
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('is_approved')}>
						<div className='flex justify-between'>
							<span>Status</span>
							<span>{renderSortIndicator('is_approved')}</span>
						</div>
					</th>
					<th scope='col' className='px-6 py-3'>
						Actions
					</th>
				</tr>
			</thead>
			<tbody>
				{/* Assume categories is passed as a prop after fetching */}
				{categories?.map((category) => (
					<tr
						key={category.id}
						className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
						<td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
							<span title={category.name}>
								{truncateText(category.name, 15)}
							</span>
						</td>
						<td className='px-6 py-4'>
							{category.created_by.email}
						</td>
						<td className='px-6 py-4'>
							{new Date(category.created_at).toLocaleDateString()}
						</td>
						<td className='px-6 py-4'>
							{new Date(category.updated_at).toLocaleDateString()}
						</td>
						<td className='px-6 py-4'>
							<span
								className={`${
									category.is_approved
										? 'text-green-600'
										: 'text-red-600'
								} font-semibold`}>
								{category.is_approved
									? 'Approved'
									: 'Pending Approval'}
							</span>
						</td>
						<td className='px-6 py-4 text-right'>
							<button
								className='text-blue-600 dark:text-blue-500 hover:underline'
								onClick={() => onEdit(category)}>
								Edit
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default CategoryTable;
