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
			<div className='absolute lg:right-0 mt-2 w-72 bg-sectionBgColour2 border border-cardBorderColour rounded-md shadow-lg z-[51]'>
				<div className='block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg'>
					Notifications
				</div>
				<div className='max-h-[20rem] overflow-y-auto divide-y divide-gray-800'>
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
				<a
					href='#'
					className='block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg'>
					<div className='inline-flex items-center '>
						<svg
							className='w-4 h-4 me-2 text-gray-500 dark:text-gray-400'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='currentColor'
							viewBox='0 0 20 14'>
							<path d='M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z' />
						</svg>
						View all
					</div>
				</a>
			</div>
		</>
	);
}

export default NotificationDropdown;
