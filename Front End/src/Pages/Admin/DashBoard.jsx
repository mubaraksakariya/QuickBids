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

	const renderTabContent = () => {
		switch (selectedTab) {
			case 'Home':
				return <AdminHome />;
			case 'Products':
				return <AdminProducts />;
			case 'Categories':
				return <AdminCategories />;
			case 'Report':
				return <AdminReport />;
			case 'Notifications':
				return <AdminNotifications />;
			case 'Message':
				return <AdminMessages />;
			default:
				return <AdminHome />;
		}
	};

	return (
		<div className='min-h-screen container mx-auto bg-sectionBgColour7 flex flex-col'>
			{/* Top Navbar */}
			<header className='bg-sectionBgColour1 shadow-md'>
				<AdminTopNavbar
					selectedTab={selectedTab}
					setSearchString={setSearchString}
				/>
			</header>

			<div className='flex flex-1'>
				{/* Sidebar */}
				<aside className='bg-navBg text-navIcon shadow-lg w-64 hidden md:block'>
					<DashBoardLeftSideNav
						selectedTab={selectedTab}
						setSelectedTab={setSelectedTab}
					/>
				</aside>

				{/* Main Content Area */}
				<main className='flex-1 p-6'>
					{/* Dynamic Content */}
					{renderTabContent()}
				</main>
			</div>
		</div>
	);
}

export default DashBoard;
