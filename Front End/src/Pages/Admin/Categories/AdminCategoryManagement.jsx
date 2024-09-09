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

const AdminCategoryManagement = () => {
	const [fromDate, setFromDate] = useState(subMonths(new Date(), 1));
	const [toDate, setToDate] = useState(new Date());
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [isCreateFormVisible, setCreateFormVisible] = useState(false);
	const pageSize = 10;
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

	// Calculate total pages
	const totalPages = data ? Math.ceil(data.count / pageSize) : 1;

	// Toggle form visibility
	const toggleCreateForm = () => {
		setCreateFormVisible(!isCreateFormVisible);
	};

	return (
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
				onEdit={(category) => {
					openCategoryModal(category);
				}}
			/>

			{/* Pagination */}
			<div className='mt-6'>
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
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
	);
};

export default AdminCategoryManagement;
