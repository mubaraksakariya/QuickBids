import React, { useEffect, useState } from 'react';
import { subMonths } from 'date-fns';
import Pagination from '../../../Components/Pagination/Pagination';
import { useAdminModals } from '../../../Context/AdminModalContext';
import RefreshButton from '../../../Components/Buttons/RefreshButton';
import DateRangePicker from '../Products/Components/DateRangePicker';
import SearchBar from '../Common/SearchBar';
import useSalesReport from './Components/useSalesReport';
import SalesTable from './Components/SalesTable';
import AuctionCompletionChart from './Components/Charts/AuctionCompletionChart/AuctionCompletionChart';
import AuctionCompletionByCategoryChart from './Components/Charts/AuctionCompletionByCategoryChart/AuctionCompletionByCategoryChart';

const AdminSales = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [fromDate, setFromDate] = useState(subMonths(new Date(), 1));
	const [toDate, setToDate] = useState(new Date());
	// const { openSaleModal } = useAdminModals();
	const [sorting, setSorting] = useState({
		field: 'created_at',
		order: 'asc',
	});

	const { data, isLoading, isError, error, refetch } = useSalesReport(
		searchQuery,
		fromDate,
		toDate,
		currentPage,
		pageSize,
		sorting
	);

	return (
		<>
			<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
				<div className='flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4'>
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
				<SalesTable
					sales={data ? data.results : []}
					setSorting={setSorting}
					sorting={sorting}
					onEdit={(sale) => {
						openSaleModal(sale);
					}}
				/>
				<Pagination
					pageSize={pageSize}
					currentPage={currentPage}
					totalItem={data?.count}
					onPageChange={(page) => setCurrentPage(page)}
				/>
			</div>
			<div className=' flex justify-evenly'>
				<AuctionCompletionChart />
				<AuctionCompletionByCategoryChart />
			</div>
		</>
	);
};

export default AdminSales;
