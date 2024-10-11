import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../Store/authSlice';

const AdminUserDropDown = () => {
	// State to manage dropdown visibility
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
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

	const manageLogout = () => {
		console.log('logout');
	};

	return (
		<div className='relative' ref={dropdownRef}>
			<button
				onClick={toggleDropdown}
				className='text-white bg-buttonColour2 rounded-full overflow-clip'>
				<span className=' max-w-8 block'>
					<img
						className=' w-full h-full'
						src={user?.profile_picture}
						alt='profile'
					/>
				</span>
			</button>
			{/* Dropdown menu */}
			{isOpen && (
				<div className='absolute z-50 right-0 mt-2 w-48 bg-sectionBgColour5 border border-cardBorderColour rounded-lg shadow-lg'>
					<ul className='py-1'>
						<li className='p-2 hover:bg-sectionBgColour2 cursor-pointer rounded-t-md transition-colors'>
							Profile
						</li>
						<li className='p-2 hover:bg-sectionBgColour2 cursor-pointer transition-colors'>
							Settings
						</li>
						<li
							className='p-2 hover:bg-sectionBgColour2 cursor-pointer rounded-b-md transition-colors'
							onClick={() => dispatch(logout())}>
							Logout
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default AdminUserDropDown;
