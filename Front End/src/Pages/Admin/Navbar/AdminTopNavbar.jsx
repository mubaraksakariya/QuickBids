import React from 'react';
import AdminUserDropDown from './AdminUserDropDown';
import AdminNotificationDropDown from './AdminNotificationDropDown';
import Notifications from '../../../Components/Navbar/Components/Notifications';

const AdminTopNavbar = () => {
	return (
		<div className='flex items-center justify-between w-full bg-sectionBgColour2 p-4 border-b border-cardBorderColour'>
			{/* Left Side: Dashboard Header and Search Box */}
			<div className='flex items-center space-x-4'>
				<h1 className='text-2xl font-bold text-headerColour'>
					Dashboard
				</h1>
			</div>

			{/* Right Side: Notification Icon and User Dropdown */}
			<div className='flex items-center space-x-6'>
				<AdminNotificationDropDown />
				{/* <Notifications /> */}
				<AdminUserDropDown />
			</div>
		</div>
	);
};

export default AdminTopNavbar;
