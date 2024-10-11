import React from 'react';
import { useSelector } from 'react-redux';

const NotificationIcon = ({ toggleDropdown }) => {
	const unreadCount = useSelector((state) => state.notifications.unreadCount);
	return (
		<button
			onClick={toggleDropdown}
			className='relative focus:outline-none'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth={1.5}
				stroke='currentColor'
				className='h-6 w-6 text-bodyTextColour'>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0'
				/>
			</svg>
			{unreadCount > 0 && (
				<span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full'>
					{unreadCount}
				</span>
			)}
		</button>
	);
};

export default NotificationIcon;
