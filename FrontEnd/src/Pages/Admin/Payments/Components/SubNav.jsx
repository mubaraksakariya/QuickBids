import React from 'react';

const SubNav = ({ tab, setTab }) => {
	const tabs = [
		{ name: 'Withdrawal requests', id: 'Withdrawal' },
		{ name: 'Payment completed', id: 'completed' },
		{ name: 'Payment pending', id: 'pending' },
	];

	return (
		<ul className='flex space-x-6  text-headerColour'>
			{tabs.map((item) => {
				const isActive = tab === item.id;
				return (
					<li
						key={item.id}
						onClick={() => setTab(item.id)}
						className={`pb-2 cursor-pointer border-b-2 ${
							isActive
								? 'text-linkColour border-linkColour'
								: 'border-transparent hover:text-linkHoverColour hover:border-linkColour'
						}`}>
						{item.name}
					</li>
				);
			})}
		</ul>
	);
};

export default SubNav;
