import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../Store/authSlice';
import { useNavigate } from 'react-router-dom';
import useWallet from '../../../CustomHooks/useWallet';

const UserDropdown = ({ user }) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

	const { data: wallet, error, isLoading } = useWallet();

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setDropdownOpen(false);
			}
		}
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<div ref={dropdownRef} className='relative'>
			<button
				onClick={() => setDropdownOpen(!dropdownOpen)}
				className='flex items-center justify-center text-black focus:outline-none aspect-square rounded-full border border-black hover:border-white min-w-10 max-w-10'>
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
						className='w-[80%] hover:text-white'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
						/>
					</svg>
				)}
			</button>
			{dropdownOpen && (
				<div className='absolute lg:right-0 mt-2 w-72 bg-sectionBgColour2 border border-cardBorderColour rounded-md shadow-lg z-[51]'>
					<div className='block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg'>
						{user.first_name}
					</div>
					<div className='max-h-[20rem] overflow-y-auto divide-y divide-gray-800'>
						<div className='p-2 text-center text-bodyTextColour'>
							{user.email}
						</div>
						<ul
							className='py-2 text-sm text-gray-700 dark:text-gray-200'
							aria-labelledby='dropdownUserAvatarButton'>
							<li>
								<a
									onClick={() => navigate('/profile/')}
									className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'>
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
									onClick={() => navigate('/profile/wallet/')}
									className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'>
									<section className='flex justify-between'>
										<span>Wallet</span>
										{error && <span>{error.message}</span>}
										{isLoading && <span>Loading...</span>}
										{wallet && (
											<span>{wallet.balance}</span>
										)}
									</section>
								</a>
							</li>
						</ul>
					</div>
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
