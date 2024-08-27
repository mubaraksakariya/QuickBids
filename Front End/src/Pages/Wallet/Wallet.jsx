import React, { useMemo, useState } from 'react';
import NoneHomeNavbar from '../../Components/Navbar/NoneHomeNavbar';
import useWalletTransactions from '../../CustomHooks/useWalletTransactions';
import useWallet from '../../CustomHooks/useWallet';
import Footer from '../../Components/Footer/Footer';
import AddToWallet from './Components/AddToWallet';
import { formatDate } from './Components/helpers';
import WalletHistorySection from './Components/WalletHistorySection';
import WalletBalanceSection from './Components/WalletBalanceSection';

function Wallet() {
	const [isAddToWallet, setIsAddToWallet] = useState(false);

	const {
		data: wallet,
		error: walletError,
		isLoading: isWalletLoading,
	} = useWallet();

	const walletBalance = useMemo(() => {
		if (isWalletLoading) return 'Loading balance...';
		return wallet?.balance || '0';
	}, [wallet, isWalletLoading]);

	return (
		<div className='full-page relative'>
			<NoneHomeNavbar />
			<div className='sm:flex sm:justify-center content-section'>
				<div className='flex flex-col sm:flex-row p-5 sm:w-[90%]'>
					<WalletHistorySection />
					<WalletBalanceSection
						walletBalance={walletBalance}
						isAddToWallet={isAddToWallet}
						setIsAddToWallet={setIsAddToWallet}
					/>
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
