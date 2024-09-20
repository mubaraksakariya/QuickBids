import React from 'react';
import NotificationItem from './NotificationItem';

const NotificationList = ({ notifications }) => {
	return (
		<div className='absolute z-50 right-0 mt-2 w-80 bg-sectionBgColour3 border border-cardBorderColour rounded-lg shadow-lg transition-transform transform origin-top-right scale-95 animate-fadeIn'>
			<div className='px-4 py-2 bg-sectionBgColour1 border-b border-cardBorderColour rounded-t-lg flex justify-between items-center'>
				<h3 className='text-headerColour font-semibold text-lg'>
					Notifications
				</h3>
			</div>

			<ul className='divide-y divide-cardBorderColour max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
				{notifications.length > 0 ? (
					notifications.map((notification) => (
						<NotificationItem
							notification={notification}
							key={notification.id}
						/>
					))
				) : (
					<li className='p-4 text-bodyTextColour text-center'>
						No new notifications
					</li>
				)}
			</ul>
		</div>
	);
};

export default NotificationList;
