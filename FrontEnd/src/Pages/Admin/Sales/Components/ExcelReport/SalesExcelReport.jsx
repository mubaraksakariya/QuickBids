import React from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const SalesExcelReport = ({
	data,
	fileName = 'SalesReport',
	sheetName = 'Sheet1',
}) => {
	const exportToExcel = () => {
		// Create a worksheet from the data
		const worksheet = XLSX.utils.json_to_sheet(data);

		// Create a new workbook and append the worksheet
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

		// Generate an Excel file and save it
		const excelBuffer = XLSX.write(workbook, {
			bookType: 'xlsx',
			type: 'array',
		});
		const blob = new Blob([excelBuffer], {
			type: 'application/octet-stream',
		});
		saveAs(blob, `${fileName}.xlsx`);
	};

	return (
		<button onClick={exportToExcel} className=''>
			Excel
		</button>
	);
};

export default SalesExcelReport;
