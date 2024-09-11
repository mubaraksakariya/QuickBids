import React, { useEffect, useState } from 'react';
import { subMonths } from 'date-fns';
import SearchBar from '../Common/SearchBar';
import ProductTable from './Components/ProductTable';
import useAuctionsFiltered from '../../../CustomHooks/useAuctionsFiltered';
import Pagination from '../../../Components/Pagination/Pagination';
import DateRangePicker from './Components/DateRangePicker';
import { useAdminModals } from '../../../Context/AdminModalContext';
import RefreshButton from '../../../Components/Buttons/RefreshButton';

const AdminProducts = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [fromDate, setFromDate] = useState(subMonths(new Date(), 1));
	const [toDate, setToDate] = useState(new Date());
	const { openProductModal } = useAdminModals();
	const [sorting, setSorting] = useState({
		field: 'created_at',
		order: 'asc',
	});

	const {
		data: auctions,
		isLoading,
		isError,
		error,
		refetch,
	} = useAuctionsFiltered(
		currentPage,
		pageSize,
		fromDate,
		toDate,
		searchQuery,
		sorting
	);

	return (
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
			<ProductTable
				auctions={auctions ? auctions.results : []}
				setSorting={setSorting}
				sorting={sorting}
				onEdit={(auction) => {
					openProductModal(auction);
				}}
			/>
			<Pagination
				pageSize={pageSize}
				currentPage={currentPage}
				totalItem={auctions?.count}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</div>
	);
};

export default AdminProducts;
