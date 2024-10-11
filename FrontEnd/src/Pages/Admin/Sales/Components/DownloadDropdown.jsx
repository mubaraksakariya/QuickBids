import React, { useState, useRef, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { formatSalesDataForExcel } from './ExcelReport/dataFormatter';
import SalesExcelReport from './ExcelReport/SalesExcelReport';
import SalesPDFDocument from './PdfReport/SalesPDFDocument';

const DownloadDropdown = ({ data, fromDate, toDate }) => {
	const [showDropDown, setShowDropDown] = useState(false);
	const dropdownRef = useRef(null);

	const toggleDropDown = () => setShowDropDown((old) => !old);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setShowDropDown(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [dropdownRef]);

	return (
		<div className='relative inline-block' ref={dropdownRef}>
			<button
				onClick={toggleDropDown}
				type='button'
				className='inline-flex px-1 py-1 justify-center w-full rounded-md dark:bg-gray-700 dark:text-white text-sm font-medium text-gray-700 hover:bg-gray-50'
				id='menu-button'
				aria-expanded={showDropDown}
				aria-haspopup='true'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='size-6'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3'
					/>
				</svg>
			</button>

			{/* Dropdown */}
			{showDropDown && (
				<div
					className='origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none'
					role='menu'
					aria-orientation='vertical'
					aria-labelledby='menu-button'>
					<div className='py-1' role='none'>
						{/* PDF Download */}
						<PDFDownloadLink
							document={
								<SalesPDFDocument
									sales={data ? data.results : []}
									fromDate={fromDate}
									toDate={toDate}
								/>
							}
							fileName='sales_report.pdf'>
							{({ loading }) => (
								<button
									className='text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 block px-4 py-2 text-sm w-full text-left'
									role='menuitem'>
									{loading ? '...' : 'PDF'}
								</button>
							)}
						</PDFDownloadLink>

						{/* Excel Download */}
						<div className='text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 block px-4 py-2 text-sm w-full text-left'>
							<SalesExcelReport
								data={
									data
										? formatSalesDataForExcel(
												data.results,
												fromDate,
												toDate
										  )
										: []
								}
								fileName='SalesReport'
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DownloadDropdown;
