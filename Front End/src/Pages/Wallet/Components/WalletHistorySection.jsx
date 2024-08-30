import { useMemo, useState } from 'react';
import { PaginationNav } from '../../../Components/Navbar/PaginationNav';
import useWalletTransactions from '../../../CustomHooks/useWalletTransactions';
import NoTransactions from './NoTransactions';
import TransactionItem from './TransactionItem';

const WalletHistorySection = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const {
		data: transactions,
		error: transactionsError,
		isLoading: isTransactionsLoading,
	} = useWalletTransactions(currentPage);

	// const lastPaymentDate = useMemo(() => {
	// 	if (isTransactionsLoading) return 'Loading...';
	// 	if (transactions && transactions[0])
	// 		return formatDate(transactions[0].timestamp);
	// 	return 'No transactions available';
	// }, [transactions, isTransactionsLoading]);

	return (
		<div className='flex-[8] sm:order-1 order-2'>
			<div className='pb-4'>
				<h1 className='text-xl'>Wallet history</h1>
				{/* <p className='text-xs'>Last payment date: {lastPaymentDate}</p> */}
			</div>
			{transactionsError && <span>{transactionsError.message}</span>}
			{isTransactionsLoading && <span>Loading transactions...</span>}
			<div className='flex gap-4 flex-col md:h-[80%] h-[45dvh] overflow-y-auto'>
				{transactions?.count > 0 ? (
					transactions.results.map((transaction) => (
						<TransactionItem
							transaction={transaction}
							key={transaction.id}
						/>
					))
				) : (
					<NoTransactions />
				)}
			</div>
			<div className=' flex justify-center py-2'>
				<PaginationNav
					transactions={transactions}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			</div>
		</div>
	);
};
export default WalletHistorySection;
