import React from 'react';
import OutbidItem from './OutbidItem';

function NotificationItems({ notification }) {
	// const handleMarkAsRead = (id) => {
	// 	dispatch(markNotificationRead(id));
	// };
	// const handleRemoveNotification = (id) => {
	// 	dispatch(removeNotification(id));
	// };

	// const handleClearAll = () => {
	// 	dispatch(clearNotifications());
	// };
	if (notification.type == 'OUTBID')
		return <OutbidItem notification={notification} />;
}

export default NotificationItems;
