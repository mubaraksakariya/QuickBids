import React from 'react';
import { useAdminModals } from '../../../../Context/AdminModalContext';

const NotificationItem = ({ notification }) => {
	const { openWithdrawalRequestModal } = useAdminModals();
	const manageOpen = (notification) => {
		console.log(notification);
		if (notification.type == 'WITHDRAWALREQUEST')
			openWithdrawalRequestModal(notification.withdrawal_request);
	};
	return (
		<li
			onClick={() => manageOpen(notification)}
			key={notification.id}
			className='bg-sectionBgColour1 p-4 rounded-md shadow-sm border border-cardBorderColour cursor-pointer'>
			<p className='text-bodyTextColour'>
				<strong className='text-headerColour'>Message:</strong>{' '}
				{notification.message}
			</p>
			<p className='text-bodyTextColour'>
				<strong className='text-headerColour'>Type:</strong>{' '}
				{notification.type}
			</p>
			<p className='text-bodyTextColour'>
				<strong className='text-headerColour'>Created at:</strong>{' '}
				{new Date(notification.created_at).toLocaleString()}
			</p>
		</li>
	);
};

export default NotificationItem;
