import React, { useState } from 'react';
import NoneHomeNavbar from '../../Components/Navbar/NoneHomeNavbar';
import useWalletTransactions from '../../CustomHooks/useWalletTransactions';
import TransactionItem from './Components/TransactionItem';
import useWallet from '../../CustomHooks/useWallet';
import ThemeButtons from '../../Components/Buttons/ThemeButton';
import Footer from '../../Components/Footer/Footer';
import AddToWallet from './Components/AddToWallet';
import { formatDate } from './Components/helpers';

function Wallet() {
	const [isAddToWallet, setIsAddToWallet] = useState(false);
	const {
		data: transactions,
		error: transactionsError,
		isLoading: isTransactionsLoading,
	} = useWalletTransactions();
	const {
		data: wallet,
		error: walletError,
		isLoading: isWalletLoading,
	} = useWallet();

	return (
		<div className='full-page relative'>
			<NoneHomeNavbar />
			<div className='sm:flex sm:justify-center content-section'>
				<div className='flex flex-col sm:flex-row p-5 sm:w-[90%]'>
					<div className='flex-[8] sm:order-1 order-2'>
						<div className='pb-4'>
							<h1 className='text-xl'>Wallet history</h1>
							<p className='text-xs'>
								Last payment date:{' '}
								{isTransactionsLoading ? (
									<span>Loading...</span>
								) : transactions && transactions[0] ? (
									formatDate(transactions[0].timestamp)
								) : (
									'No transactions available'
								)}
							</p>
						</div>
						{transactionsError && (
							<span>{transactionsError.message}</span>
						)}
						{isTransactionsLoading && (
							<span>Loading transactions...</span>
						)}
						<div className='flex gap-4 flex-col md:h-[90%] h-[50dvh] overflow-y-auto'>
							{transactions?.length > 0 ? (
								transactions.map((transaction) => {
									return (
										<TransactionItem
											transaction={transaction}
											key={transaction.id}
										/>
									);
								})
							) : (
								<div className='flex flex-col'>
									<span>No transactions yet</span>
									<span>Add some points to wallet</span>
								</div>
							)}
						</div>
					</div>
					<div className='flex-[4] sm:order-2 order-1 flex sm:justify-end justify-center'>
						<div>
							<div className='w-52 aspect-video flex flex-col gap-2 justify-center items-center bg-sectionBgColour2'>
								{isWalletLoading ? (
									<span>Loading balance...</span>
								) : (
									<span>{wallet?.balance}</span>
								)}
								<span className='text-xs'>
									Available Balance
								</span>
							</div>
							<div className='mt-4 flex justify-center'>
								<ThemeButtons
									text='Balance'
									onclick={() =>
										setIsAddToWallet((old) => !old)
									}
									icon={
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth={1.5}
											stroke='currentColor'
											className='size-4'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M4.5 18.75l7.5-7.5 7.5 7.5'
											/>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M4.5 12.75l7.5-7.5 7.5 7.5'
											/>
										</svg>
									}
									style={6}
									className={'p-2 text-xs'}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			{isAddToWallet && (
				<AddToWallet setIsAddToWallet={setIsAddToWallet} />
			)}
			<Footer />
		</div>
	);
}

export default Wallet;
