import React, { useState, useRef, useEffect } from 'react';

const AdminNotificationDropDown = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	// Demo notifications data
	const notifications = [
		{
			id: 1,
			message: 'New user signed up.',
			time: '2 mins ago',
		},
		{
			id: 2,
			message: 'Server rebooted successfully.',
			time: '10 mins ago',
		},
		{
			id: 3,
			message: 'Payment processed.',
			time: '1 hour ago',
		},
	];

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
			<button onClick={toggleDropdown} className='focus:outline-none'>
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
			</button>
			{/* Dropdown menu */}
			{isOpen && (
				<div className='absolute right-0 mt-2 w-72 bg-sectionBgColour1 border border-cardBorderColour rounded shadow-lg'>
					<ul className='divide-y divide-cardBorderColour'>
						{notifications.length > 0 ? (
							notifications.map((notification) => (
								<li
									key={notification.id}
									className='p-4 hover:bg-sectionBgColour2 cursor-pointer'>
									<p className='text-bodyTextColour'>
										{notification.message}
									</p>
									<span className='text-sm text-gray-500'>
										{notification.time}
									</span>
								</li>
							))
						) : (
							<li className='p-4 text-bodyTextColour'>
								No new notifications
							</li>
						)}
					</ul>
				</div>
			)}
		</div>
	);
};

export default AdminNotificationDropDown;
