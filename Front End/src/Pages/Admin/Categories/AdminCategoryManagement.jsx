import React, { useEffect, useState } from 'react';
import { subMonths } from 'date-fns';
import SearchBar from '../Common/SearchBar';
import CategoryTable from './Components/CategoryTable';
import useAllCategories from '../../../CustomHooks/useAllCategories';
import Pagination from '../../../Components/Pagination/Pagination';
import RefreshButton from '../../../Components/Buttons/RefreshButton';
import DateRangePicker from '../Products/Components/DateRangePicker';
import { useAdminModals } from '../../../Context/AdminModalContext';
import CreateCategoryForm from './Components/CreateCategoryForm';

const AdminCategoryManagement = () => {
	const [fromDate, setFromDate] = useState(subMonths(new Date(), 1));
	const [toDate, setToDate] = useState(new Date());
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 10;
	const [categories, setCategories] = useState([]);
	const { openCategoryModal } = useAdminModals();
	const [sorting, setSorting] = useState({
		field: 'created_at',
		order: 'desc',
	});

	// Fetch categories with search, date range, sorting, pagination
	const { data, isLoading, isError, error, refetch } = useAllCategories(
		searchQuery,
		fromDate,
		toDate,
		currentPage,
		pageSize,
		sorting
	);

	// Update categories when data changes
	useEffect(() => {
		setCategories(data?.results);
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
				<div className='flex gap-4'>
					<RefreshButton refresh={refetch} />
					<SearchBar
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						setCurrentPage={setCurrentPage}
					/>
				</div>
			</div>
			<CategoryTable
				categories={categories || []}
				setSorting={setSorting}
				sorting={sorting}
				onEdit={(category) => {
					openCategoryModal(category);
				}}
			/>
			<CreateCategoryForm onSuccess={refetch} />
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</div>
	);
};

export default AdminCategoryManagement;
