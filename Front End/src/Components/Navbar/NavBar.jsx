import React, { useState } from 'react';
import SearchBar from './Components/SearchBar';
import UserDropdown from './Components/UserDropdown';
import NavIcon from './Components/NavIcon';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import SellIcon from './Components/SellIcon';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const user = useSelector((state) => state.auth.user);
	const navigate = useNavigate();
	return (
		<nav className='bg-gray-800 p-4 bg-themeBgColour border-b-2 '>
			<div className='flex items-center justify-between flex-wrap gap-4'>
				<NavIcon />
				<div className='block lg:hidden'>
					<button
						onClick={() => setIsOpen(!isOpen)}
						className='flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='size-10 text-black'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
							/>
						</svg>
					</button>
				</div>
				<div
					className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
						isOpen ? '' : 'hidden'
					}`}>
					<div className='ml-auto lg:flex items-center'>
						<SearchBar />
						{user ? (
							<UserDropdown user={user} />
						) : (
							<span
								className='cursor-pointer underline'
								onClick={() => navigate('/login/')}>
								login
							</span>
						)}
						<SellIcon />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
