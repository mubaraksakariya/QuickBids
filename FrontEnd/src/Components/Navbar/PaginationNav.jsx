import React from 'react';

export const PaginationNav = ({
	transactions,
	currentPage,
	setCurrentPage,
	pageSize = 5, // Default items per page
}) => {
	const totalItems = transactions?.count || 0;
	const totalPages = Math.ceil(totalItems / pageSize);

	const getPageNumbers = () => {
		let startPage = Math.max(currentPage - 2, 1);
		let endPage = Math.min(currentPage + 2, totalPages);

		// Adjust the range to always show 5 numbers if possible
		if (endPage - startPage < 4) {
			if (startPage === 1) {
				endPage = Math.min(startPage + 4, totalPages);
			} else if (endPage === totalPages) {
				startPage = Math.max(endPage - 4, 1);
			}
		}

		const pageNumbers = [];
		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(i);
		}
		return pageNumbers;
	};
	const managePageChange = (operation) => {
		if (operation == '+' && currentPage + 1 < totalPages) {
			setCurrentPage(currentPage + 1);
		}
		if (operation == '-' && currentPage - 1 > 0) {
			setCurrentPage(currentPage - 1);
		}
	};
	return (
		<nav aria-label='Page navigation'>
			<ul className='flex items-center -space-x-px h-8 text-sm'>
				<li>
					<button
						onClick={() => managePageChange('-')}
						className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${
							currentPage === 1 ? 'cursor-not-allowed' : ''
						}`}>
						<svg
							className='w-2.5 h-2.5 rtl:rotate-180'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 6 10'>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M5 1 1 5l4 4'
							/>
						</svg>
					</button>
				</li>

				{getPageNumbers().map((page) => (
					<li key={page}>
						<button
							onClick={() => setCurrentPage(page)}
							className={`flex items-center justify-center px-3 h-8 leading-tight ${
								page === currentPage
									? 'z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
									: 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
							} dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
							{page}
						</button>
					</li>
				))}

				<li>
					<button
						onClick={() => managePageChange('+')}
						className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${
							currentPage === totalPages
								? 'cursor-not-allowed'
								: ''
						}`}>
						<svg
							className='w-2.5 h-2.5 rtl:rotate-180'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 6 10'>
							<path
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='m1 9 4-4-4-4'
							/>
						</svg>
					</button>
				</li>
			</ul>
		</nav>
	);
};
