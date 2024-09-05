import React, { useEffect, useState } from 'react';
import { subMonths } from 'date-fns';
import SearchBar from '../Common/SearchBar';
import ProductTable from './Components/ProductTable';
import useAuctionsFiltered from '../../../CustomHooks/useAuctionsFiltered';
import Pagination from '../../../Components/Pagination/Pagination';
import DateRangePicker from './Components/DateRangePicker';
import EditProductModal from './Components/EditProductModal';

const AdminProducts = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [auctions, setAuctions] = useState([]);
	const [selectedAuction, setSelectedAuction] = useState(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [dateRange, setDateRange] = useState({
		startDate: subMonths(new Date(), 1),
		endDate: new Date(),
	});
	const [sorting, setSorting] = useState({
		field: 'created_at',
		order: 'asc',
	});

	const { data, isLoading, isError, error, refetch } = useAuctionsFiltered(
		currentPage,
		dateRange.startDate,
		dateRange.endDate,
		searchQuery,
		sorting
	);
	const editModelColse = () => {
		setIsEditModalOpen(false);
		refetch();
	};
	useEffect(() => {
		setAuctions(data?.results);
	}, [data]);
	const totalPages = data ? Math.ceil(data.count / 10) : 1;

	return (
		<div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
			<div className='flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4'>
				<DateRangePicker setDateRange={setDateRange} />
				<SearchBar
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					setCurrentPage={setCurrentPage}
				/>
			</div>
			<ProductTable
				auctions={auctions ? auctions : []}
				setSorting={setSorting}
				sorting={sorting}
				onEdit={(auction) => {
					setSelectedAuction(auction);
					setIsEditModalOpen(true);
				}}
			/>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={(page) => setCurrentPage(page)}
			/>
			{isEditModalOpen && (
				<EditProductModal
					auction={selectedAuction}
					onClose={() => editModelColse()}
				/>
			)}
		</div>
	);
};

export default AdminProducts;
