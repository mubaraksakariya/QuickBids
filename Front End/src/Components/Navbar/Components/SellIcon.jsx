import React from 'react';
import { useNavigate } from 'react-router-dom';

function SellIcon() {
	const navigate = useNavigate();
	const manageCreate = () => {
		navigate('/product/create/');
	};

	return (
		<button className='rounded-full gradient-button' onClick={manageCreate}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth={1.5}
				stroke='currentColor'
				className='w-6 h-6 mr-1'>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M12 4.5v15m7.5-7.5h-15'
				/>
			</svg>
			Sell
		</button>
	);
}

export default SellIcon;
