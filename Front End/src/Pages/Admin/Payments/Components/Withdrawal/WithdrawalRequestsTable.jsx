import React from 'react';

const WithdrawalRequestsTable = ({ data, sorting, setSorting, onEdit }) => {
	// Function to truncate text if it's too long
	const truncateText = (text, maxLength) => {
		if (text && text.length > maxLength) {
			return `${text.substring(0, maxLength)}...`;
		}
		return text;
	};
	// Define status and their corresponding colors
	const statusColors = {
		PENDING: 'text-yellow-600',
		APPROVED: 'text-button2Colour1',
		REJECTED: 'text-errorColour',
		COMPLETED: 'text-green-600',
		FAILED: 'text-red-600',
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
		<table className='w-full text-sm text-left text-bodyTextColour'>
			<thead className='text-xs uppercase bg-sectionBgColour5 text-headerColour border-b border-cardBorderColour'>
				<tr>
					<th
						scope='col'
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('user')}>
						<div className='flex justify-between'>
							<span>User</span>
							<span>{renderSortIndicator('user')}</span>
						</div>
					</th>
					<th
						scope='col'
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('amount')}>
						<div className='flex justify-between'>
							<span>Amount</span>
							<span>{renderSortIndicator('amount')}</span>
						</div>
					</th>
					<th
						scope='col'
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('credentials')}>
						<div className='flex justify-between'>
							<span>Credentials</span>
							<span>{renderSortIndicator('credentials')}</span>
						</div>
					</th>
					<th
						scope='col'
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('status')}>
						<div className='flex justify-between'>
							<span>Status</span>
							<span>{renderSortIndicator('status')}</span>
						</div>
					</th>
					<th
						scope='col'
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('requested_at')}>
						<div className='flex justify-between'>
							<span>Requested At</span>
							<span>{renderSortIndicator('requested_at')}</span>
						</div>
					</th>
					<th scope='col' className='px-6 py-3'>
						Actions
					</th>
				</tr>
			</thead>
			<tbody className='bg-sectionBgColour7'>
				{data?.map((detail) => (
					<tr
						key={detail.id}
						className='border-b border-cardBorderColour'>
						<td className='px-6 py-4'>
							<span title={detail.user.email}>
								{detail.user.first_name}
								<br />
								{truncateText(detail.user.email, 10)}
							</span>
						</td>
						<td className='px-6 py-4'>{detail.amount}</td>
						<td className='px-6 py-4'>
							<span
								title={detail.account_details?.account_number}>
								<strong>Account:</strong>{' '}
								{truncateText(
									detail.account_details?.account_number,
									15
								)}
								<br />
								<strong>Bank:</strong>{' '}
								{detail.account_details?.bank_name || 'N/A'}
								<br />
								<strong>IFSC:</strong>{' '}
								{detail.account_details?.ifsc_code || 'N/A'}
							</span>
						</td>

						<td className='px-6 py-4'>
							{/* Dynamically apply status colors */}
							<span
								className={`${
									statusColors[detail.status] ||
									'text-gray-600'
								} font-semibold`}>
								{detail.status.charAt(0).toUpperCase() +
									detail.status.slice(1).toLowerCase()}
							</span>
						</td>
						<td className='px-6 py-4'>
							{new Date(detail.requested_at).toLocaleDateString()}
						</td>
						<td className='px-6 py-4 text-right'>
							<button
								className='text-linkColour hover:text-linkHoverColour'
								onClick={() => onEdit(detail)}>
								Edit
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default WithdrawalRequestsTable;
