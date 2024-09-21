import React, { useState } from 'react';
import { subMonths } from 'date-fns';
import SearchBar from '../Common/SearchBar';
import CategoryTable from './Components/CategoryTable';
import useAllCategories from '../../../CustomHooks/useAllCategories';
import Pagination from '../../../Components/Pagination/Pagination';
import RefreshButton from '../../../Components/Buttons/RefreshButton';
import DateRangePicker from '../Products/Components/DateRangePicker';
import { useAdminModals } from '../../../Context/AdminModalContext';
import CreateCategoryForm from './Components/CreateCategoryForm';
import ThemeButtons from '../../../Components/Buttons/ThemeButton';
import DashBoard from '../DashBoard';

const AdminCategoryManagement = () => {
	const [fromDate, setFromDate] = useState(subMonths(new Date(), 1));
	const [toDate, setToDate] = useState(new Date());
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [isCreateFormVisible, setCreateFormVisible] = useState(false);
	const [sorting, setSorting] = useState({
		field: 'created_at',
		order: 'desc',
	});

	const { data, isLoading, isError, error, refetch } = useAllCategories(
		currentPage,
		pageSize,
		fromDate,
		toDate,
		searchQuery,
		sorting
	);

	// Toggle form visibility
	const toggleCreateForm = () => {
		setCreateFormVisible(!isCreateFormVisible);
	};

	return (
		<DashBoard>
			<div className='relative bg-white shadow-md rounded-lg p-6'>
				{/* Top Bar: Search, Date Picker, and Refresh */}
				<div className='flex flex-col sm:flex-row sm:items-center justify-between mb-6'>
					<DateRangePicker
						setFromDate={setFromDate}
						setToDate={setToDate}
					/>
					<div className='flex gap-4 mt-4 sm:mt-0'>
						<RefreshButton refresh={refetch} />
						<SearchBar
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
							setCurrentPage={setCurrentPage}
						/>
					</div>
				</div>

				{/* Category Table */}
				<CategoryTable
					categories={data?.results || []}
					setSorting={setSorting}
					sorting={sorting}
				/>

				{/* Pagination */}
				<div className='mt-6'>
					<Pagination
						pageSize={pageSize}
						currentPage={currentPage}
						totalItem={data?.count}
						onPageChange={(page) => setCurrentPage(page)}
					/>
				</div>

				{/* Button to toggle create category form */}
				{!isCreateFormVisible && (
					<div className='flex justify-end pt-4'>
						<ThemeButtons
							text='Create'
							style={4}
							className={' px-2'}
							onclick={toggleCreateForm}
						/>
					</div>
				)}
				{/* Create Category Form Modal */}
				{isCreateFormVisible && (
					<CreateCategoryForm
						onSuccess={() => {
							refetch();
							setCreateFormVisible(false);
						}}
						onClose={() => setCreateFormVisible(false)}
					/>
				)}
			</div>
		</DashBoard>
	);
};

export default AdminCategoryManagement;
