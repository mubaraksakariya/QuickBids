import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../Store/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';

const DashBoardLeftSideNav = () => {
	const [selectedTab, setSelectedTab] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const navItems = [
		{ name: 'home', id: 'home' },
		{ name: 'users', id: 'users' },
		{ name: 'products', id: 'products' },
		{ name: 'categories', id: 'categories' },
		{ name: 'sales', id: 'sales' },
		{ name: 'payments', id: 'payments' },
		{ name: 'notifications', id: 'notifications' },
		{ name: 'messages', id: 'messages' },
	];

	useEffect(() => {
		const currentPath = location.pathname.split('/')[2];
		if (currentPath) {
			setSelectedTab(currentPath);
		} else {
			setSelectedTab('home');
		}
	}, [location]);

	// Handle tab click
	const handleTabClick = (tab) => {
		setSelectedTab(tab);
		navigate(`/admin/${tab}/`);
	};

	return (
		<div className='flex flex-col justify-between h-full bg-sectionBgColour2 border-r border-cardBorderColour p-4 w-64'>
			<ul className='space-y-4 flex-grow'>
				{navItems.map((item) => (
					<li
						key={item.id}
						className={`p-3 rounded cursor-pointer transition-colors duration-200 ${
							selectedTab === item.name
								? 'bg-buttonColour1 text-white'
								: 'text-bodyTextColour hover:bg-sectionBgColour1 hover:text-headerColour'
						}`}
						onClick={() => handleTabClick(item.name)}>
						{item.name}
					</li>
				))}
			</ul>
			<div className='mt-auto'>
				<li
					className='p-3 rounded cursor-pointer text-bodyTextColour hover:bg-sectionBgColour1 hover:text-headerColour transition-colors duration-200'
					onClick={() => dispatch(logout())}>
					Logout
				</li>
			</div>
		</div>
	);
};

export default DashBoardLeftSideNav;
