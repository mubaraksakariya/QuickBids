import React, { useState } from 'react';
import Tabs from './Tabs';
import ThemeButtons from '../../../../Components/Buttons/ThemeButton';
import { AccountInput } from './AccountInput';
import CardInput from './Debit/CardInput';
import UpiInput from './Upi/UpiInput';

const Withdrawal = ({ setIsWithdraw }) => {
	const [selectedTab, setSeletctTab] = useState('account');
	const getTab = () => {
		if (selectedTab == 'account')
			return <AccountInput setIsWithdraw={setIsWithdraw} />;
		if (selectedTab == 'card')
			return <CardInput setIsWithdraw={setIsWithdraw} />;
		if (selectedTab == 'upi')
			return <UpiInput setIsWithdraw={setIsWithdraw} />;
	};
	const manageWithdrawal = () => {};
	return (
		<div className='fixed inset-0 z-50 bg-black bg-opacity-50 flex flex-col justify-center items-center'>
			<div className=' bg-sectionBgColour2 shadow-lg rounded-lg xl:min-w-[30%] lg:min-w-[50%] md:min-w-[50%]'>
				<div className='flex flex-col gap-5 justify-center items-center relative p-5'>
					<h2 className='text-xl font-semibold mb-2'>Withdraw</h2>
				</div>
				<div className=''>
					<div className=' px-5'>
						<Tabs
							setSeletctTab={setSeletctTab}
							selectedTab={selectedTab}
						/>
					</div>
					<div>{getTab()}</div>
				</div>
			</div>
		</div>
	);
};

export default Withdrawal;
