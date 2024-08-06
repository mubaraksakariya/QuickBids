import React, { useEffect, useRef, useState } from 'react';
import NotificationButton from './NotificationButton';
import NotificationDropdown from './NotificationDropdown';

function Notifications() {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

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
		<div ref={dropdownRef} className='relative inline-block text-left'>
			<NotificationButton setIsOpen={setIsOpen} />
			{isOpen && <NotificationDropdown />}
		</div>
	);
}

export default Notifications;
