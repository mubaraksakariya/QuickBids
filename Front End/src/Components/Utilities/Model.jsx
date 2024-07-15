import React, { useEffect, useState } from 'react';

const Modal = ({ show, onClose, children, autoCloseAfter }) => {
	const [countdown, setCountdown] = useState(autoCloseAfter / 1000);

	useEffect(() => {
		let timer;
		let interval;
		if (show && autoCloseAfter) {
			// Set a timer to close the modal after the specified duration
			timer = setTimeout(() => {
				onClose();
			}, autoCloseAfter);

			// Set an interval to update the countdown every second
			interval = setInterval(() => {
				setCountdown((prev) => prev - 1);
			}, 1000);
		}

		return () => {
			// Clear the timer and interval if the modal is closed manually before the duration
			clearTimeout(timer);
			clearInterval(interval);
			setCountdown(autoCloseAfter / 1000); // Reset the countdown
		};
	}, [show, autoCloseAfter, onClose]);

	if (!show) {
		return null;
	}

	return (
		<div
			className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
			onClick={onClose}>
			<div
				className='bg-white p-6 rounded-lg shadow-lg relative'
				onClick={(e) => e.stopPropagation()}>
				{/* <button
					className='absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-gray-800'
					onClick={onClose}>
					&times;
				</button> */}
				{children}
				<div className='flex justify-center mt-4'>
					<button
						onClick={onClose}
						type='button'
						className='inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white  bg-button2Colour1 hover:bg-button2Colour2 active:bg-button2Colour3 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
						OK
						<span className='inline-flex items-center justify-center w-6 h-6 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full'>
							{countdown}
						</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
