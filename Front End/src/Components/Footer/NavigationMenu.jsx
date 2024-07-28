import React from 'react';

function NavigationMenu() {
	return (
		<div className='flex flex-col gap-2 pb-4'>
			{/* Home Navigation Item */}
			<div className='flex gap-3 items-center cursor-pointer'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-5 h-5'>
					{' '}
					{/* Reduced size */}
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='m8.25 4.5 7.5 7.5-7.5 7.5'
					/>
				</svg>
				<span className='text-sm'>Home</span> {/* Adjusted font size */}
			</div>

			{/* Profile Navigation Item */}
			<div className='flex gap-3 items-center cursor-pointer'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-5 h-5'>
					{' '}
					{/* Reduced size */}
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='m8.25 4.5 7.5 7.5-7.5 7.5'
					/>
				</svg>
				<span className='text-sm'>Profile</span>{' '}
				{/* Adjusted font size */}
			</div>

			{/* Wallet Navigation Item */}
			<div className='flex gap-3 items-center cursor-pointer'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-5 h-5'>
					{' '}
					{/* Reduced size */}
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='m8.25 4.5 7.5 7.5-7.5 7.5'
					/>
				</svg>
				<span className='text-sm'>Wallet</span>{' '}
				{/* Adjusted font size */}
			</div>

			{/* About Us Navigation Item */}
			<div className='flex gap-3 items-center cursor-pointer'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-5 h-5'>
					{' '}
					{/* Reduced size */}
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='m8.25 4.5 7.5 7.5-7.5 7.5'
					/>
				</svg>
				<span className='text-sm'>About Us</span>{' '}
				{/* Adjusted font size */}
			</div>
		</div>
	);
}

export default NavigationMenu;
