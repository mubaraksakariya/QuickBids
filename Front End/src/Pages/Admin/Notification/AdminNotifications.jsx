import React, { useState } from 'react';
import DashBoard from '../DashBoard';
import useNotifications from '../../../CustomHooks/useNotifications';
import Pagination from '../../../Components/Pagination/Pagination';
import NotificationItem from './Components/NotificationItem';

const AdminNotifications = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);

	const { data, error, isLoading } = useNotifications(currentPage, pageSize);

	if (isLoading) return <p className='text-bodyTextColour'>Loading...</p>;
	if (error)
		return <p className='text-errorColour'>Error loading notifications</p>;

	return (
		<DashBoard>
			<h2 className='text-headerColour text-2xl font-bold mb-4 '>
				Admin Notifications
			</h2>
			<div className='overflow-y-auto bg-sectionBgColour5 border border-cardBorderColour rounded-lg'>
				{data?.results.length === 0 ? (
					<p className='text-bodyTextColour text-center p-4 space-y-4'>
						No notifications available
					</p>
				) : (
					<ul className='p-4 space-y-4'>
						{data?.results.map((notification) => (
							<NotificationItem
								notification={notification}
								key={notification.id}
							/>
						))}
					</ul>
				)}
				{/* Pagination */}
				<div className='mt-6 p-4 space-y-4'>
					<Pagination
						pageSize={pageSize}
						currentPage={currentPage}
						totalItem={data?.count}
						onPageChange={(page) => setCurrentPage(page)}
					/>
				</div>
			</div>
		</DashBoard>
	);
};

export default AdminNotifications;
