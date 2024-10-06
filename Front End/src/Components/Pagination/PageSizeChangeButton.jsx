import React from 'react';

const PageSizeChanger = ({ pageSize, setPageSize }) => {
	// Handle input change (direct input)
	const handleInputChange = (e) => {
		const newSize = Number(e.target.value);
		if (!isNaN(newSize) && newSize >= 1) setPageSize(newSize);
	};

	// Increase page size
	const onIncrease = () => setPageSize((prev) => prev + 1);

	// Decrease page size
	const onDecrease = () =>
		setPageSize((prev) => (prev > 1 ? prev - 1 : prev));

	return (
		<div className='flex items-center justify-center space-x-1 relative'>
			<label htmlFor='pageSize' className=' text-xs absolute -bottom-5'>
				Page size
			</label>
			<button
				onClick={onDecrease}
				aria-label='Decrease page size'
				className='bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-2 rounded-l border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
				-
			</button>
			<input
				type='text'
				id='pageSize'
				className='w-12 p-0 m-0 text-center border-y border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
				value={pageSize}
				min={1}
				onChange={handleInputChange}
				aria-label='Page size'
			/>
			<button
				onClick={onIncrease}
				aria-label='Increase page size'
				className='bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-2 rounded-r border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
				+
			</button>
		</div>
	);
};

export default PageSizeChanger;
