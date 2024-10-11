import React, { useEffect } from 'react';
import { useNotificationsContext } from '../../../../Context/NotificationContext';
import LocalTimeDisplay from '../../../../Components/Utilities/LocalTimeDisplay';

function NotificationItem({ notification }) {
	const { manageMarkAsRead } = useNotificationsContext();
	const getStyle = () => {
		if (!notification.is_read) return 'bg-green-100';
	};
	useEffect(() => {
		return () => {
			manageMarkAsRead(notification);
		};
	}, [notification, manageMarkAsRead]);

	return (
		<div
			className={`p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100  ${getStyle()}`}
			onClick={() => console.log(data)}>
			<div className='text-sm font-medium text-gray-900'>
				{notification.message}
			</div>
			<LocalTimeDisplay
				timestamp={notification.created_at}
				formatOptions={{
					weekday: 'long',
					hour: 'numeric',
					minute: 'numeric',
				}}
			/>
		</div>
	);
}

export default NotificationItem;
