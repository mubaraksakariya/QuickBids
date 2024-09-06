import React, { useEffect, useState } from 'react';
import { startOfDay, endOfDay, format, subMonths } from 'date-fns';

const DateRangePicker = ({ setFromDate, setToDate }) => {
	// Initialize with default values for fromDate and toDate
	const [startDate, setStartDate] = useState(
		format(startOfDay(subMonths(new Date(), 1)), "yyyy-MM-dd'T'HH:mm")
	);
	const [endDate, setEndDate] = useState(
		format(endOfDay(new Date()), "yyyy-MM-dd'T'HH:mm")
	);

	// Effect to set initial date range
	useEffect(() => {
		setFromDate(new Date(startDate));
		setToDate(new Date(endDate));
	}, [startDate, endDate, setFromDate, setToDate]);

	// Handle date changes
	const handleStartDateChange = (e) => {
		const newStartDate = e.target.value;
		setStartDate(newStartDate);
		setFromDate(new Date(newStartDate));
	};

	const handleEndDateChange = (e) => {
		const newEndDate = e.target.value;
		setEndDate(newEndDate);
		setToDate(new Date(newEndDate));
	};

	return (
		<div className='flex flex-col gap-3 md:flex-row items-center justify-between space-y-2 md:space-y-0 md:space-x-2 p-3 bg-sectionBgColour5 rounded-md shadow-sm'>
			<label className='flex items-center space-x-1'>
				<span className='text-bodyTextColour text-sm font-medium'>
					From:
				</span>
				<input
					type='datetime-local'
					value={startDate}
					onChange={handleStartDateChange}
					className='border border-cardBorderColour p-1 rounded bg-sectionBgColour1 text-bodyTextColour text-sm focus:outline-none focus:ring-1 focus:ring-buttonColour1'
				/>
			</label>
			<label className='flex items-center space-x-1'>
				<span className='text-bodyTextColour text-sm font-medium'>
					To:
				</span>
				<input
					type='datetime-local'
					value={endDate}
					onChange={handleEndDateChange}
					className='border border-cardBorderColour p-1 rounded bg-sectionBgColour1 text-bodyTextColour text-sm focus:outline-none focus:ring-1 focus:ring-buttonColour1'
				/>
			</label>
		</div>
	);
};

export default DateRangePicker;
