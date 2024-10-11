import React, { useState, useEffect } from 'react';

const ConfirmationDialog = ({ message, onConfirm, onCancel, isOpen }) => {
	const [showConfirmation, setShowConfirmation] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => {
				setShowConfirmation(true);
			}, 50);
		} else {
			setShowConfirmation(false);
		}
	}, [isOpen]);

	return isOpen ? (
		<div className='fixed inset-0 flex items-center justify-center z-[0] bg-black bg-opacity-50'>
			<div
				className={`bg-sectionBgColour2 border border-cardBorderColour rounded-lg transition-transform duration-500 p-6 shadow-lg ${
					showConfirmation
						? 'transform scale-100'
						: 'transform scale-0'
				}`}>
				<p className='text-bodyTextColour mb-4 m-2'>{message}</p>
				<div className='flex justify-center gap-5 mt-5'>
					<button
						onClick={onConfirm}
						className='bg-button2Colour1 hover:bg-button2Colour2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-button2Colour3'>
						Confirm
					</button>
					<button
						onClick={onCancel}
						className='bg-errorColour text-white font-bold py-2 px-5 rounded focus:outline-none focus:ring-2 focus:ring-errorColour'>
						Cancel
					</button>
				</div>
			</div>
			{/* <div className='fixed inset-0 bg-black opacity-50'></div> */}
		</div>
	) : null;
};

export default ConfirmationDialog;
