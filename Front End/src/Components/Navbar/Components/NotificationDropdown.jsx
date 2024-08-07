import React from 'react';
import NotificationItems from './NotificationItems';
import { useDispatch } from 'react-redux';
import { clearNotifications } from '../../../Store/notificationSlice';

function NotificationDropdown({ notifications }) {
	const dispatch = useDispatch();
	const handleClearAll = () => {
		dispatch(clearNotifications());
	};
	return (
		<>
			<div className='absolute right-0 mt-2 w-72 bg-sectionBgColour2 border border-cardBorderColour rounded-md shadow-lg z-[51]'>
				<div className='max-h-[20rem] overflow-y-auto'>
					<div className='p-2'>
						{notifications?.length === 0 ? (
							<div className='p-2 text-center text-bodyTextColour'>
								No notifications
							</div>
						) : (
							notifications?.map((notification) => (
								<NotificationItems
									notification={notification}
									key={notification.id}
								/>
							))
						)}
					</div>
				</div>
				<div className='p-0 bg-sectionBgColour2 flex justify-center'>
					<span className='text-center text-linkColour cursor-pointer hover:text-linkHoverColour'>
						View all
					</span>
				</div>
			</div>
		</>
	);
}

export default NotificationDropdown;
