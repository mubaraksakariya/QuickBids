import React, { useState } from 'react';
import SearchBar from './Components/SearchBar';
import UserDropdown from './Components/UserDropdown';
import NavIcon from './Components/NavIcon';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SellIcon from './Components/SellIcon';
import CollapseButton from './Components/CollapseButton';

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
						{user && isAuthenticated ? (
							<UserDropdown user={user} />
						) : (
							<span
								className='cursor-pointer hover:underline text-white'
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
