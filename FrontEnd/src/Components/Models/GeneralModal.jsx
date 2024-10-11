import React, { useEffect, useState } from 'react';

const GeneralModal = ({ show, onClose, children, autoCloseAfter }) => {
	const [countdown, setCountdown] = useState(
		autoCloseAfter ? autoCloseAfter / 1000 : null
	);

	useEffect(() => {
		let timer;
		let interval;

		if (show && autoCloseAfter) {
			timer = setTimeout(() => {
				onClose();
			}, autoCloseAfter);

			interval = setInterval(() => {
				setCountdown((prev) => prev - 1);
			}, 1000);
		}

		return () => {
			clearTimeout(timer);
			clearInterval(interval);
			setCountdown(autoCloseAfter ? autoCloseAfter / 1000 : null);
		};
	}, [show, autoCloseAfter, onClose]);

	if (!show) {
		return null;
	}

	return (
		<div
			className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
			// onClick={onClose}
		>
			<div
				className='bg-white p-6 rounded-lg shadow-lg relative'
				onClick={(e) => e.stopPropagation()}>
				{children}

				<div className='flex justify-center mt-4'>
					<button
						onClick={onClose}
						type='button'
						className='inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-button2Colour1 hover:bg-button2Colour2 active:bg-button2Colour3 rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
						OK
						{countdown && (
							<span className='inline-flex items-center justify-center w-6 h-6 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full'>
								{countdown}
							</span>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default GeneralModal;
