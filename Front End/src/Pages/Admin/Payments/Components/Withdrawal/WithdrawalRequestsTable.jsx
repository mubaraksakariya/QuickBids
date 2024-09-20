import React, { memo, useMemo, useState } from 'react';
import CredentialsRenderer from './CredentialsRenderer';

// Helper function to truncate text
const truncateText = (text, maxLength) =>
	text?.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

// Status colors mapping
const statusColors = {
	PENDING: 'text-yellow-600',
	APPROVED: 'text-button2Colour1',
	REJECTED: 'text-errorColour',
	COMPLETED: 'text-green-600',
	FAILED: 'text-red-600',
};

// Memoized table component to prevent unnecessary re-renders
const WithdrawalRequestsTable = memo(
	({ data, sorting, setSorting, onEdit, filter, setFilter }) => {
		// Sorting state for credentials fields
		const credentialFields = [
			'account_detail',
			'card_detail',
			'upi_detail',
		];
		const [credentialFieldsSortingIndex, setCredentialFieldsSortingIndex] =
			useState(0);

		// Handle sorting logic
		const handleSort = (field) => {
			if (field === 'credentials') {
				// Update sorting with the new credential field and keep the same order
				setSorting({
					order: 'asc',
					field: credentialFields[
						credentialFieldsSortingIndex % credentialFields.length
					],
				});
				setCredentialFieldsSortingIndex(
					credentialFieldsSortingIndex + 1
				);
			} else {
				setSorting((prevSorting) => {
					const order =
						prevSorting.field === field &&
						prevSorting.order === 'asc'
							? 'desc'
							: 'asc';
					return { field, order };
				});
			}
		};

		// Memoize sorting indicator rendering
		const renderSortIndicator = useMemo(
			() => (field) => {
				if (sorting.field === field) {
					return sorting.order === 'asc' ? '▲' : '▼';
				}
				return '';
			},
			[sorting]
		);

		return (
			<>
				{/* Status Filter Dropdown */}
				<div className='mb-4 flex items-center justify-end'>
					<label className='mr-2 text-sm font-medium'>
						Filter by Status:
					</label>
					<select
						className='px-2 py-1 border rounded '
						value={filter.value}
						onChange={(e) =>
							setFilter({
								field: 'status',
								value: e.target.value,
							})
						}>
						<option value=''>All</option>
						<option value='PENDING'>Pending</option>
						<option value='APPROVED'>Approved</option>
						<option value='REJECTED'>Rejected</option>
						<option value='COMPLETED'>Completed</option>
						<option value='FAILED'>Failed</option>
					</select>
				</div>

				{/* Table Rendering */}
				<table className='w-full text-sm text-left text-bodyTextColour'>
					<thead className='text-xs uppercase bg-sectionBgColour5 text-headerColour border-b border-cardBorderColour'>
						<tr>
							{[
								'User',
								'Amount',
								'Credentials',
								'Status',
								'Requested At',
							].map((header, index) => (
								<th
									key={index}
									scope='col'
									className='px-6 py-3 cursor-pointer'
									onClick={() =>
										handleSort(
											header
												.toLowerCase()
												.replace(' ', '_')
										)
									}>
									<div className='flex justify-between'>
										<span>{header}</span>
										<span>
											{renderSortIndicator(
												header
													.toLowerCase()
													.replace(' ', '_')
											)}
										</span>
									</div>
								</th>
							))}
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
									<CredentialsRenderer detail={detail} />
								</td>
								<td className='px-6 py-4'>
									<span
										className={`${
											statusColors[detail.status] ||
											'text-gray-600'
										} font-semibold`}>
										{detail.status}
									</span>
								</td>
								<td className='px-6 py-4'>
									{new Date(
										detail.requested_at
									).toLocaleDateString()}
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
			</>
		);
	}
);

export default WithdrawalRequestsTable;
