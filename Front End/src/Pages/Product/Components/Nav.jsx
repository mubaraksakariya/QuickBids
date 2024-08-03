import React from 'react';
import { useNavigate } from 'react-router-dom';

function Nav() {
	const navigate = useNavigate();
	return (
		<nav className='flex items-center p-3 border-bA'>
			<button onClick={() => navigate('/')}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 20 20'
					fill='currentColor'
					className='size-5'>
					<path
						fillRule='evenodd'
						d='M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z'
						clipRule='evenodd'
					/>
				</svg>
			</button>
		</nav>
	);
}

export default Nav;