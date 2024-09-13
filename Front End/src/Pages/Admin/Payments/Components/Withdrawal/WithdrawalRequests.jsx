import React, { useState } from 'react';
import { subMonths } from 'date-fns';
import useWithdrawalRequests from './useWithdrawalRequests';
import WithdrawalRequestsTable from './WithdrawalRequestsTable';
import { useAdminModals } from '../../../../../Context/AdminModalContext';
import DateRangePicker from '../../../Products/Components/DateRangePicker';
import RefreshButton from '../../../../../Components/Buttons/RefreshButton';
import SearchBar from '../../../Common/SearchBar';
import Pagination from '../../../../../Components/Pagination/Pagination';

const WithdrawalRequests = () => {
	const [fromDate, setFromDate] = useState(subMonths(new Date(), 1));
	const [toDate, setToDate] = useState(new Date());
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [isCreateFormVisible, setCreateFormVisible] = useState(false);
	const { openCategoryModal } = useAdminModals();
	const [sorting, setSorting] = useState({
		field: 'created_at',
		order: 'desc',
	});
	const { data, isLoading, isError, error, refetch } = useWithdrawalRequests(
		currentPage,
		pageSize,
		fromDate,
		toDate,
		searchQuery,
		sorting
	);

	// Calculate total pages
	const totalPages = data ? Math.ceil(data.count / pageSize) : 1;

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

			{/* Withdrawal Requests Table */}
			<WithdrawalRequestsTable
				data={data?.results || []}
				setSorting={setSorting}
				sorting={sorting}
				onEdit={(item) => {
					openCategoryModal(item);
				}}
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

			{/* Create Withdrawal Request Form Modal */}
			{isCreateFormVisible && (
				<CreateWithdrawalRequestForm
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

export default WithdrawalRequests;
