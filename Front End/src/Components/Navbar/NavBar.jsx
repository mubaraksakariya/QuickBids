import React, { useState } from 'react';
import SearchBar from './Components/SearchBar';
import UserDropdown from './Components/UserDropdown';
import NavIcon from './Components/NavIcon';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SellIcon from './Components/SellIcon';
import CollapseButton from './Components/CollapseButton';
import Notifications from './Components/Notifications';

const Navbar = ({ setSearchSTring }) => {
	const [isOpen, setIsOpen] = useState(false);
	const user = useSelector((state) => state.auth.user);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const navigate = useNavigate();
	return (
		<nav className='nav-bar'>
			<div className='flex items-center justify-between flex-wrap gap-4'>
				<NavIcon />
				<div className='block lg:hidden'>
					<CollapseButton setIsOpen={setIsOpen} isOpen={isOpen} />
				</div>
				<div
					className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
						isOpen ? '' : 'hidden'
					}`}>
					<div className='ml-auto lg:flex items-center'>
						<SearchBar setSearchSTring={setSearchSTring} />
						<div className='flex gap-3 lg:justify-normal justify-center items-center lg:px-0 px-2'>
							<div className='lg:m-2 mt-2'>
								{isAuthenticated && <Notifications />}
							</div>
							{user && isAuthenticated ? (
								<div className='lg:m-2 mt-2'>
									<UserDropdown user={user} />
								</div>
							) : (
								<span
									className='cursor-pointer hover:underline text-white'
									onClick={() => navigate('/login/')}>
									login
								</span>
							)}
							<div className='flex-grow lg:flex-grow-0 flex justify-end'>
								<SellIcon />
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
