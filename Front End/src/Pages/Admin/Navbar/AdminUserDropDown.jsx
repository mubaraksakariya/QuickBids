import React, { useState, useEffect, useRef } from 'react';

const AdminUserDropDown = () => {
	// State to manage dropdown visibility
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	// Function to toggle the dropdown visibility
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
			<button
				onClick={toggleDropdown}
				className='text-bodyTextColour bg-buttonColour1 p-2 rounded focus:outline-none'>
				User
			</button>
			{/* Dropdown menu */}
			{isOpen && (
				<div className='absolute right-0 mt-2 w-48 bg-sectionBgColour1 border border-cardBorderColour rounded shadow-lg'>
					<ul>
						<li className='p-2 hover:bg-sectionBgColour2 cursor-pointer'>
							Profile
						</li>
						<li className='p-2 hover:bg-sectionBgColour2 cursor-pointer'>
							Settings
						</li>
						<li className='p-2 hover:bg-sectionBgColour2 cursor-pointer'>
							Logout
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default AdminUserDropDown;
