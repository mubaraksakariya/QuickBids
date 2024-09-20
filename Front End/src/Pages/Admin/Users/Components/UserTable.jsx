import React from 'react';
import { useAdminModals } from '../../../../Context/AdminModalContext';

const UserTable = ({ users, sorting, setSorting }) => {
	const { openUserModal: onEdit } = useAdminModals();

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

	const manageEdit = (user) => {
		onEdit(user);
	};

	return (
		<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
			<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
				<tr>
					<th
						scope='col'
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('email')}>
						<div className='flex justify-between'>
							<span>Email</span>
							<span>{renderSortIndicator('email')}</span>
						</div>
					</th>
					<th
						scope='col'
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('first_name')}>
						<div className='flex justify-between'>
							<span>First Name</span>
							<span>{renderSortIndicator('first_name')}</span>
						</div>
					</th>
					<th
						scope='col'
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('last_name')}>
						<div className='flex justify-between'>
							<span>Last Name</span>
							<span>{renderSortIndicator('last_name')}</span>
						</div>
					</th>
					<th
						scope='col'
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('created_at')}>
						<div className='flex justify-between'>
							<span>Date Joined</span>
							<span>{renderSortIndicator('created_at')}</span>
						</div>
					</th>
					<th
						scope='col'
						className='px-6 py-3 cursor-pointer'
						onClick={() => handleSort('is_active')}>
						<div className='flex justify-between'>
							<span>Status</span>
							<span>{renderSortIndicator('is_active')}</span>
						</div>
					</th>
					<th scope='col' className='px-6 py-3'>
						Actions
					</th>
				</tr>
			</thead>
			<tbody>
				{users?.map((user) => (
					<tr
						key={user.id}
						className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
						{/* <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
							<span title={user.id}>
								{truncateText(user.email, 15)}
							</span>
						</td> */}
						<td className='px-6 py-4'>{user.email}</td>
						<td className='px-6 py-4'>{user.first_name}</td>
						<td className='px-6 py-4'>{user.last_name}</td>
						<td className='px-6 py-4'>
							{new Date(user.created_at).toLocaleDateString()}
						</td>
						<td className='px-6 py-4'>
							<span
								className={`${
									user.is_active
										? 'text-green-600'
										: 'text-red-600'
								} font-semibold`}>
								{user.is_active ? 'Active' : 'Inactive'}
							</span>
						</td>
						<td className='px-6 py-4 text-right'>
							<button
								className='text-blue-600 dark:text-blue-500 hover:underline'
								onClick={() => manageEdit(user)}>
								Edit
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default UserTable;
