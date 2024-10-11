import React, { useEffect } from 'react';

function Toast({ message, type = 'success', onClose, className = '' }) {
	useEffect(() => {
		const timer = setTimeout(onClose, 3000);
		return () => clearTimeout(timer);
	}, [onClose]);

	return (
		<div
			className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center p-4 rounded shadow-lg max-w-xs w-full text-white ${
				type === 'success' ? 'bg-green-600' : 'bg-red-600'
			} transition-all duration-300 ${className}`}>
			<div className='flex-1 text-sm font-medium'>{message}</div>
			<button
				onClick={onClose}
				className='ml-4 text-white hover:text-gray-200 transition-all duration-200'>
				<span>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='currentColor'
						className='size-6'>
						<path
							fillRule='evenodd'
							d='M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z'
							clipRule='evenodd'
						/>
					</svg>
				</span>
			</button>
		</div>
	);
}

export default Toast;
