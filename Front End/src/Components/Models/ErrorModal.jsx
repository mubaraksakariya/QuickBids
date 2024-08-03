import React from 'react';

const ErrorModal = ({ message, onClose, title = 'Notice' }) => {
	return (
		<div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30'>
			<div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-2 border-2 '>
				<div className='flex justify-between items-center'>
					<h2 className='text-xl font-semibold text-errorColour'>
						{title}
					</h2>
					<button
						onClick={onClose}
						className='text-errorColour hover:text-red-700 transition duration-200'>
						✕
					</button>
				</div>
				<p className='mt-4 text-gray-800'>{message}</p>
				<button
					onClick={onClose}
					className='mt-6 w-full bg-errorColour hover:bg-red-700 text-white py-2 rounded-lg transition-colors duration-300'>
					Close
				</button>
			</div>
		</div>
	);
};

export default ErrorModal;
