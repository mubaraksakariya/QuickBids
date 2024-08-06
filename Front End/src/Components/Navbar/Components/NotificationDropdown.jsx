import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearNotifications,
	markNotificationRead,
	removeNotification,
} from '../../../Store/notificationSlice';

function NotificationDropdown() {
	const dispatch = useDispatch();
	const notifications = useSelector(
		(state) => state.notifications.notifications
	);
	const handleMarkAsRead = (id) => {
		dispatch(markNotificationRead(id));
	};

	const handleRemoveNotification = (id) => {
		dispatch(removeNotification(id));
	};

	const handleClearAll = () => {
		dispatch(clearNotifications());
	};
	return (
		<div className='absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-10'>
			<div className='p-2'>
				{notifications.length === 0 ? (
					<div className='p-2 text-center text-gray-500'>
						No notifications
					</div>
				) : (
					notifications.map((notification) => (
						<div
							key={notification.id}
							className='p-2 border-b border-gray-200'>
							<div className='text-sm font-medium text-gray-900'>
								{notification.message}
							</div>
							<div className='text-xs text-gray-500'>
								{new Date(
									notification.timestamp
								).toLocaleString()}
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default NotificationDropdown;
