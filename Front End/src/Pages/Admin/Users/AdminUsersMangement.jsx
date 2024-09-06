import React, { useEffect, useState } from 'react';
import { subMonths } from 'date-fns';
import DateRangePicker from '../Products/Components/DateRangePicker';
import SearchBar from '../Common/SearchBar';
import UserTable from './Components/UserTable';
import useAllUsers from '../../../CustomHooks/useAllUsers';
import Pagination from '../../../Components/Pagination/Pagination';
import { useAdminModals } from '../../../Context/AdminModalContext';

const AdminUsersMangement = () => {
	const [fromDate, setFromDate] = useState(subMonths(new Date(), 1));
	const [toDate, setToDate] = useState(new Date());
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 10;
	const [users, setUsers] = useState([]);
	const { openUserModal } = useAdminModals();
	const [sorting, setSorting] = useState({
		field: 'created_at',
		order: 'dec',
	});

	// Fetch users with search, date range, sorting, pagination
	const { data, isLoading, isError, error, refetch } = useAllUsers(
		searchQuery,
		fromDate,
		toDate,
		currentPage,
		pageSize,
		sorting
	);

	// Log the data if available
	if (data) console.log(data);

	// Update users when data changes
	useEffect(() => {
		setUsers(data?.results);
	}, [data]);

	// Calculate total pages
	const totalPages = data ? Math.ceil(data.count / pageSize) : 1;

	return (
		<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
			<div className='flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4'>
				{/* Pass setFromDate and setToDate to DateRangePicker */}
				<DateRangePicker
					setFromDate={setFromDate}
					setToDate={setToDate}
				/>

				<SearchBar
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					setCurrentPage={setCurrentPage}
				/>
			</div>
			<UserTable
				users={users || []}
				setSorting={setSorting}
				sorting={sorting}
				onEdit={(user) => {
					// setSelectedUser(user);
					// setIsEditModalOpen(true);
					openUserModal(user);
				}}
			/>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</div>
	);
};

export default AdminUsersMangement;
