import React from 'react';
import { useSelector } from 'react-redux';

function NotificationButton({ setIsOpen }) {
	const unreadCount = useSelector((state) => state.notifications.unreadCount);
	const handleOpen = () => {
		setIsOpen((old) => !old);
	};
	const getUnreadClass = () => {
		if (unreadCount > 0) return 'ring-inset ring-8 ring-notificationRing';
	};
	return (
		<button
			onClick={handleOpen}
			className={`p-2 rounded-full bg-sectionBgColour1 hover:bg-sectionBgColour2 text-navBg hover:text-linkColour focus:outline-none focus:ring-2 focus:ring-sectionBgColour10 shadow-lg ${getUnreadClass()}`}>
			<span className='inline-block align-middle'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					fill='currentColor'
					className='w-6 h-6 transition-transform duration-300 transform hover:scale-110'>
					<path d='M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z' />
					<path
						fillRule='evenodd'
						d='M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z'
						clipRule='evenodd'
					/>
				</svg>
				{/* {unreadCount} */}
			</span>
		</button>
	);
}

export default NotificationButton;
