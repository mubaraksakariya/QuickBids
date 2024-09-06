// Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const handlePageChange = (page) => {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page);
		}
	};

	return (
		<nav
			className='flex items-center flex-column flex-wrap md:flex-row justify-between pt-4'
			aria-label='Table navigation'>
			<span className='text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto'>
				Showing{' '}
				<span className='font-semibold text-gray-900 dark:text-white'>
					{currentPage * 10 - 9}-{currentPage * 10}
				</span>{' '}
				of{' '}
				<span className='font-semibold text-gray-900 dark:text-white'>
					{totalPages * 10}
				</span>
			</span>
			<ul className='inline-flex -space-x-px rtl:space-x-reverse text-sm h-8'>
				<li>
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
						disabled={currentPage === 1}>
						Previous
					</button>
				</li>
				{[...Array(totalPages).keys()].map((number) => (
					<li key={number + 1}>
						<button
							onClick={() => handlePageChange(number + 1)}
							className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
								number + 1 === currentPage
									? 'text-blue-600 border-blue-300 bg-blue-50 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
									: ''
							}`}>
							{number + 1}
						</button>
					</li>
				))}
				<li>
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
						disabled={currentPage === totalPages}>
						Next
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;