import React from 'react';
import { useSelector } from 'react-redux';

function TransactionItem({ transaction }) {
	const user = useSelector((state) => state.auth.user);

	return (
		<div className='p-4 bg-sectionBgColour6 rounded-lg shadow-md flex items-center justify-between transition-transform transform hover:shadow-lg'>
			<div>
				<p className='text-sm text-gray-500'>
					{new Date(transaction.timestamp).toLocaleString([], {
						dateStyle: 'short',
						timeStyle: 'short',
					})}
				</p>
				<p className='text-lg font-bold text-gray-800'>
					₹{transaction.amount}
				</p>
				<p className='text-sm text-gray-600 capitalize'>
					{transaction.transaction_type.toLowerCase()}
				</p>
			</div>
			<div className='text-right'>
				<p
					className='text-sm text-gray-700 font-medium'
					title={user?.email}>
					{user?.first_name}
				</p>
			</div>
		</div>
	);
}

export default TransactionItem;
