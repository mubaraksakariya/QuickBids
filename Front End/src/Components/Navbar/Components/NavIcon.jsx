import React from 'react';

function NavIcon() {
	return (
		<div className='flex items-center flex-shrink-0 text-black mr-6'>
			<a
				href='/'
				className='flex items-center space-x-3 rtl:space-x-reverse'>
				<img src='./Logo.png' className='h-8' alt='Quick Bids Logo' />
				<span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
					Quick Bids
				</span>
			</a>
		</div>
	);
}

export default NavIcon;
