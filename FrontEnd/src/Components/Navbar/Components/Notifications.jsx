import React, { useEffect, useRef, useState } from 'react';
import NotificationButton from './NotificationButton';
import NotificationDropdown from './NotificationDropdown';
import { useSelector } from 'react-redux';

function Notifications() {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);
	const notifications = useSelector(
		(state) => state.notifications.notifications
	);

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		}
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<div ref={dropdownRef} className='relative'>
			<NotificationButton setIsOpen={setIsOpen} />
			{isOpen && <NotificationDropdown notifications={notifications} />}
		</div>
	);
}

export default Notifications;
