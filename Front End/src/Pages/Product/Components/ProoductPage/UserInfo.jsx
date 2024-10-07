import React from 'react';
import { useAdminModals } from '../../../../Context/AdminModalContext';

export const UserInfo = ({ user, highestBid }) => {
	// const { openUserModal: onEdit } = useAdminModals();

	return (
		<div className='flex items-center p-4 bg-sectionBgColour2 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer'>
			<div className='flex-shrink-0'>
				{user?.profile_picture ? (
					<img
						className='w-10 h-10 rounded-full border-2 border-gray-300'
						src={user?.profile_picture}
						alt={`${user?.first_name}'s profile picture`}
					/>
				) : (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-10 h-10 text-gray-400'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
						/>
					</svg>
				)}
			</div>
			<div className='flex-1 min-w-0 ml-4'>
				<p className='text-base font-semibold text-gray-900 truncate'>
					{user?.first_name}
				</p>
				<p className='text-sm text-gray-500 truncate'>{user?.email}</p>
			</div>
			<div className='inline-flex items-center text-lg font-bold text-green-600'>
				{highestBid?.amount?.toLocaleString()}
			</div>
		</div>
	);
};
