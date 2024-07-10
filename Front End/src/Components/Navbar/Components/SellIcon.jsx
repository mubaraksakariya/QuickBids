import React from 'react';

function SellIcon() {
	const manageCreate = () => {
		console.log('create');
	};
	return (
		<button
			className=' border border-black rounded-full bg-white flex p-2 m-2'
			onClick={manageCreate}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth={1.5}
				stroke='currentColor'
				className='size-6'>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M12 4.5v15m7.5-7.5h-15'
				/>
			</svg>
			sell
		</button>
	);
}

export default SellIcon;
