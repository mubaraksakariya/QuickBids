import React from 'react';

const Tabs = ({ selectedTab, setSeletctTab }) => {
	const setTab = (tab) => {
		setSeletctTab(tab);
	};
	return (
		<ul className='flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400'>
			<li className='me-2'>
				<button
					onClick={() => setTab('account')}
					aria-current='page'
					className={`inline-block p-4 text-blue-600 ${
						selectedTab == 'account' ? 'bg-gray-100' : ''
					} rounded-t-lg active dark:bg-gray-800 dark:text-blue-500`}>
					Account
				</button>
				<button
					onClick={() => setTab('card')}
					aria-current='page'
					className={`inline-block p-4 text-blue-600 ${
						selectedTab == 'card' ? 'bg-gray-100' : ''
					} rounded-t-lg active dark:bg-gray-800 dark:text-blue-500`}>
					Card
				</button>
				<button
					onClick={() => setTab('upi')}
					aria-current='page'
					className={`inline-block p-4 text-blue-600 ${
						selectedTab == 'upi' ? 'bg-gray-100' : ''
					} rounded-t-lg active dark:bg-gray-800 dark:text-blue-500`}>
					UPI
				</button>
				{/* <button
					onClick={() => setTab('account')}
					aria-current='page'
					className={`inline-block p-4 text-blue-600 ${
						selectedTab == 'account' ? 'bg-gray-100' : ''
					} rounded-t-lg active dark:bg-gray-800 dark:text-blue-500`}>
					Account
				</button> */}
			</li>
		</ul>
	);
};

export default Tabs;
