import React from 'react';

const AuctionStatusIndicator = ({ isActive, isTimeOver }) => {
	const getStatusLabel = () => 'Active';

	const getStatusColor = () => {
		if (!isActive || isTimeOver) return 'bg-errorColour text-white';
		return 'bg-green-500 text-white';
	};

	const getStatusStyle = () => {
		if (!isActive || isTimeOver) return 'line-through';
		return '';
	};
	const getStatusIcon = () => {
		if (!isActive || isTimeOver) {
			return (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={2}
					stroke='currentColor'
					className='w-4 h-4 mr-1 '>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M6 18L18 6M6 6l12 12'
					/>
				</svg>
			);
		}
		return (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth={2}
				stroke='currentColor'
				className='w-4 h-4 mr-1'>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M5 13l4 4L19 7'
				/>
			</svg>
		);
	};

	return (
		<div
			className={`inline-flex items-center px-2 py-1 rounded-b-xl text-sm font-semibold shadow-2xl transition-all duration-300 ${getStatusColor()}`}>
			{/* {getStatusIcon()} */}
			<span className={`${getStatusStyle()}`}>{getStatusLabel()}</span>
		</div>
	);
};

export default AuctionStatusIndicator;
