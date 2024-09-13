import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../Store/authSlice';

const DashBoardLeftSideNav = ({ setSelectedTab, selectedTab }) => {
	const dispatch = useDispatch();

	const handleTabClick = (tab) => {
		setSelectedTab(tab);
	};

	// Array of navigation items
	const navItems = [
		{ name: 'Home', id: 'home' },
		{ name: 'Users', id: 'users' },
		{ name: 'Products', id: 'products' },
		{ name: 'Categories', id: 'categories' },
		{ name: 'Sales', id: 'sales' },
		{ name: 'Payments', id: 'Payments' },
		{ name: 'Notifications', id: 'notifications' },
		{ name: 'Message', id: 'message' },
	];

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
					className={`p-3 rounded cursor-pointer text-bodyTextColour hover:bg-sectionBgColour1 hover:text-headerColour transition-colors duration-200`}
					onClick={() => dispatch(logout())}>
					Logout
				</li>
			</div>
		</div>
	);
};

export default DashBoardLeftSideNav;
