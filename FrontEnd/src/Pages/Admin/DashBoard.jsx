import React, { useState } from 'react';
import DashBoardLeftSideNav from './Navbar/DashBoardLeftSideNav';
import AdminTopNavbar from './Navbar/AdminTopNavbar';
import { AdminModalProvider } from '../../Context/AdminModalContext';

function DashBoard({ children }) {
	return (
		<AdminModalProvider>
			<div className='min-h-screen container mx-auto bg-sectionBgColour7 flex flex-col'>
				{/* Top Navbar */}
				<header className='bg-sectionBgColour1 shadow-md'>
					<AdminTopNavbar />
				</header>

				<div className='flex flex-1'>
					{/* Sidebar */}
					<aside className='bg-navBg text-navIcon shadow-lg w-64 hidden md:block'>
						<DashBoardLeftSideNav />
					</aside>

					{/* Main Content Area */}
					<main className='flex-1 p-6'>{children}</main>
				</div>
			</div>
		</AdminModalProvider>
	);
}

export default DashBoard;
