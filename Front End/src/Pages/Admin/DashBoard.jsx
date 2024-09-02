import React, { useState } from 'react';
import DashBoardLeftSideNav from './Navbar/DashBoardLeftSideNav';
import AdminTopNavbar from './Navbar/AdminTopNavbar';
import AdminHome from './Home/AdminHome';
import AdminProducts from './Products/AdminProducts';
import AdminCategories from './Categories/AdminCategories';
import AdminReport from './Report/AdminReport';
import AdminNotifications from './Notification/AdminNotifications';
import AdminMessages from './Message/AdminMessages';

function DashBoard() {
	const [selectedTab, setSelectedTab] = useState('Home');
	const [searchString, setSearchString] = useState('');

	const showTab = () => {
		if (selectedTab == 'Home') return <AdminHome />;
		if (selectedTab == 'Products') return <AdminProducts />;
		if (selectedTab == 'Categories') return <AdminCategories />;
		if (selectedTab == 'Report') return <AdminReport />;
		if (selectedTab == 'Notifications') return <AdminNotifications />;
		if (selectedTab == 'Message') return <AdminMessages />;
	};
	return (
		<div className='full-page'>
			<div className='flex'>
				<div className=''>
					<DashBoardLeftSideNav
						selectedTab={selectedTab}
						setSelectedTab={setSelectedTab}
					/>
				</div>
				<div className='flex-1'>
					<AdminTopNavbar
						selectedTab={selectedTab}
						setSearchString={setSearchString}
					/>
					{showTab()}
				</div>
			</div>
		</div>
	);
}

export default DashBoard;
