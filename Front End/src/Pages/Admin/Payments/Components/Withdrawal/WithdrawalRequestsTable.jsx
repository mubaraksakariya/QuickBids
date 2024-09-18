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
	({ data, sorting, setSorting, onEdit }) => {
		// for sorting
		const credentialFields = [
			'account_detail',
			'card_detail',
			'upi_detail',
		];
		const [credentialFieldsSortingindex, setCredentialFieldsSortingindex] =
			useState(0);

		// Handle sorting logic
		const handleSort = (field) => {
			if (field === 'credentials') {
				// Update sorting with the new credential field and keep the same order
				setSorting({
					order: 'asc',
					field: credentialFields[
						(credentialFieldsSortingindex %
							credentialFields.length) -
							1
					],
				});
				setCredentialFieldsSortingindex(
					credentialFieldsSortingindex + 1
				);
			} else
				setSorting((prevSorting) => {
					const order =
						prevSorting.field === field &&
						prevSorting.order === 'asc'
							? 'desc'
							: 'asc';
					return { field, order };
				});
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
										header.toLowerCase().replace(' ', '_')
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
		);
	}
);

export default WithdrawalRequestsTable;
