import React, { useEffect } from 'react';
import NoneHomeNavbar from '../../Components/Navbar/NoneHomeNavbar';
import useWalletTransactions from '../../CustomHooks/useWalletTransactions';
import TransactionItem from './Components/TransactionItem';
import useWallet from '../../CustomHooks/useWallet';
import ThemeButtons from '../../Components/Buttons/ThemeButton';

function Wallet() {
	const {
		data: transactions,
		error: transactionsError,
		isLading: isTransactionsLoading,
	} = useWalletTransactions();
	const {
		data: wallet,
		error: walletError,
		isLading: isWalletLoading,
	} = useWallet();
	const manageAddBalance = () => {
		console.log('Balance');
	};

	return (
		<div className='min-h-[100dvh] w-full lg:w-[90%] bg-themeBgColour'>
			<NoneHomeNavbar />
			<div className='flex flex-col sm:flex-row p-5'>
				<div className='flex-[8] sm:order-1 order-2'>
					<div className=' pb-4'>
						<h1 className=' text-xl'>Wallet history</h1>
						<p className=' text-xs'>last payment date</p>
					</div>
					{transactionsError && (
						<span>{transactionsError.message}</span>
					)}
					{isTransactionsLoading && <span>Loading..</span>}
					{transactions?.length > 0 ? (
						transactions?.map((transaction) => {
							return (
								<TransactionItem transaction={transaction} />
							);
						})
					) : (
						<div className='flex flex-col'>
							<span>No transactions yet</span>
							<span>Add some points to wallet</span>
						</div>
					)}
				</div>
				<div className='flex-[4]  sm:order-2 order-1 flex justify-end sm:justify-normal'>
					<div>
						<div className='w-52 aspect-video flex flex-col gap-2 justify-center items-center bg-themeBgColour4'>
							<span>{wallet?.balance}</span>
							<span className=' text-xs'>Available Balance</span>
						</div>
						<div className='mt-4'>
							<ThemeButtons
								text='Balance'
								onclick={manageAddBalance}
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
											d='m4.5 18.75 7.5-7.5 7.5 7.5'
										/>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='m4.5 12.75 7.5-7.5 7.5 7.5'
										/>
									</svg>
								}
								style={7}
								className={'p-2 text-xs'}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Wallet;
