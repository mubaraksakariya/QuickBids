import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../Store/authSlice';

const UserDropdown = ({ user }) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);
	const dispatch = useDispatch();

	const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
	useEffect(() => {
		// Function to close dropdown when clicked outside
		function handleClickOutside(event) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setDropdownOpen(false);
			}
		}

		// Bind the event listener
		document.addEventListener('click', handleClickOutside);

		// Cleanup the event listener
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<div ref={dropdownRef} className='relative mt-4 lg:mt-0 lg:ml-4 mx-3'>
			<button
				onClick={() => setDropdownOpen(!dropdownOpen)}
				className='flex items-center text-black focus:outline-none'>
				<span className='sr-only'>Open user menu</span>
				{user.profile_picture ? (
					<img
						className='w-10 h-10 rounded-full'
						src={`${baseUrl}${user.profile_picture}`}
						alt='user photo'
					/>
				) : (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='size-6'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
						/>
					</svg>
				)}
			</button>
			{dropdownOpen && (
				<div className='absolute lg:right-0 lg:top-12 mt-2 py-2 w-75 bg-white rounded-md shadow-xl divide-y divide-gray-100'>
					<div className='px-4 py-3 text-sm text-gray-900 dark:text-white'>
						<div>{user.first_name}</div>
						<div className='font-medium truncate'>{user.email}</div>
					</div>
					<ul
						className='py-2 text-sm text-gray-700 dark:text-gray-200'
						aria-labelledby='dropdownUserAvatarButton'>
						<li>
							<a
								href='#'
								className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
								Profile
							</a>
						</li>
						<li>
							<a
								href='#'
								className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
								Settings
							</a>
						</li>
						<li>
							<a
								href='#'
								className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
								Wallet
							</a>
						</li>
					</ul>
					<div className='py-2'>
						<a
							onClick={(e) => {
								dispatch(logout());
							}}
							className='cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'>
							Sign out
						</a>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserDropdown;
