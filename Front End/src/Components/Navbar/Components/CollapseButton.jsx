import React from 'react';

function CollapseButton({ setIsOpen, isOpen }) {
	return (
		<button
			onClick={() => setIsOpen(!isOpen)}
			className='flex items-center px-3 py-2 border  text-gray-200 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 border-gray-400 hover:from-gray-500 hover:via-gray-600 hover:to-gray-700 transition-colors duration-300'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth='1.5'
				stroke='currentColor'
				className='w-6 h-6 text-gray-200'>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
				/>
			</svg>
		</button>
	);
}

export default CollapseButton;
