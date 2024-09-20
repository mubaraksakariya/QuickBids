import React, { useEffect, useState } from 'react';
import { subMonths } from 'date-fns';
import DateRangePicker from '../Products/Components/DateRangePicker';
import SearchBar from '../Common/SearchBar';
import UserTable from './Components/UserTable';
import useAllUsers from '../../../CustomHooks/useAllUsers';
import Pagination from '../../../Components/Pagination/Pagination';
import RefreshButton from '../../../Components/Buttons/RefreshButton';
import DashBoard from '../DashBoard';

const AdminUsersMangement = () => {
	const [fromDate, setFromDate] = useState(subMonths(new Date(), 1));
	const [toDate, setToDate] = useState(new Date());
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [users, setUsers] = useState([]);
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

	// Update users when data changes
	useEffect(() => {
		setUsers(data?.results);
	}, [data]);

	// Calculate total pages
	const totalPages = data ? Math.ceil(data.count / pageSize) : 1;

	return (
		<DashBoard>
			<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
				<div className='flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4'>
					{/* Pass setFromDate and setToDate to DateRangePicker */}
					<DateRangePicker
						setFromDate={setFromDate}
						setToDate={setToDate}
					/>
					<div className='flex gap-4'>
						<RefreshButton refresh={refetch} />
						<SearchBar
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
							setCurrentPage={setCurrentPage}
						/>
					</div>
				</div>
				<UserTable
					users={users || []}
					setSorting={setSorting}
					sorting={sorting}
					refetch
				/>
				<Pagination
					pageSize={pageSize}
					currentPage={currentPage}
					totalItem={data?.count}
					onPageChange={(page) => setCurrentPage(page)}
				/>
			</div>
		</DashBoard>
	);
};

export default AdminUsersMangement;
