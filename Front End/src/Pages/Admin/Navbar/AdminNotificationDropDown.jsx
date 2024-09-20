import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import NotificationIcon from './Components/NotificationIcon';
import NotificationList from './Components/NotificationList';

const AdminNotificationDropDown = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);
	const notifications = useSelector(
		(state) => state.notifications.notifications
	);

	// Toggle dropdown visibility
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	// Close dropdown if clicked outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [dropdownRef]);

	return (
		<div className='relative' ref={dropdownRef}>
			<NotificationIcon toggleDropdown={toggleDropdown} />
			{isOpen && <NotificationList notifications={notifications} />}
		</div>
	);
};

export default AdminNotificationDropDown;
