import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logo() {
	const navigate = useNavigate();
	const manageClick = (e) => {
		e.preventDefault();
		navigate('/');
	};
	return (
		<div className='flex-grow'>
			<a
				onClick={manageClick}
				className='flex items-center space-x-3 rtl:space-x-reverse cursor-pointer'>
				<img src='./Logo.png' className='h-8' alt='Quick Bids Logo' />
				<span className='text-black self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
					Quick Bids
				</span>
			</a>
		</div>
	);
}

export default Logo;
