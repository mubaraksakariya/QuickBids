import React from 'react';
import AdminUserDropDown from './AdminUserDropDown';
import AdminNotificationDropDown from './AdminNotificationDropDown';

const AdminTopNavbar = ({ selectedTab, setSearchString }) => {
	const showSearch = selectedTab == 'Home';

	return (
		<div className='flex items-center justify-between w-full bg-sectionBgColour2 p-4 border-b border-cardBorderColour'>
			{/* Left Side: Dashboard Header and Search Box */}
			<div className='flex items-center space-x-4'>
				<h1 className='text-2xl font-bold text-headerColour'>
					Dashboard
				</h1>
				{!showSearch && (
					<input
						type='text'
						placeholder='Search...'
						className='p-2 border border-cardBorderColour rounded bg-sectionBgColour1 text-bodyTextColour focus:outline-none focus:ring-2 focus:ring-buttonColour1'
						onChange={(e) =>
							setSearchString && setSearchString(e.target.value)
						}
					/>
				)}
			</div>

			{/* Right Side: Notification Icon and User Dropdown */}
			<div className='flex items-center space-x-6'>
				<AdminNotificationDropDown />
				<AdminUserDropDown />
			</div>
		</div>
	);
};

export default AdminTopNavbar;
