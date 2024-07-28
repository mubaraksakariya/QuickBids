import React from 'react';

function NavIcon() {
	return (
		<div className='flex items-center flex-shrink-0 text-white ms-16 dark:text-black'>
			<a
				href='/'
				className='flex items-center space-x-3 rtl:space-x-reverse'>
				<img src='/Logo.png' className=' h-16' alt='Quick Bids Logo' />
				<span className='ps-4 self-center text-4xl font-extrabold  whitespace-nowrap'>
					Quick <br /> Bids
				</span>
			</a>
		</div>
	);
}

export default NavIcon;
