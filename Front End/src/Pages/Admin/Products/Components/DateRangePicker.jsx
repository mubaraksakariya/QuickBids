import React, { useState, useEffect } from 'react';
import { subMonths, startOfDay, endOfDay, format } from 'date-fns';

const DateRangePicker = ({ setDateRange }) => {
	// Default values: last month as start date and this month as end date
	const defaultStartDate = subMonths(new Date(), 1);
	const defaultEndDate = new Date();

	const [startDate, setStartDate] = useState(
		format(startOfDay(defaultStartDate), "yyyy-MM-dd'T'HH:mm")
	);
	const [endDate, setEndDate] = useState(
		format(endOfDay(defaultEndDate), "yyyy-MM-dd'T'HH:mm")
	);

	// Update the date range when the component mounts
	useEffect(() => {
		setDateRange({
			startDate: format(
				startOfDay(new Date(startDate)),
				"yyyy-MM-dd'T'HH:mm:ssXXX"
			),
			endDate: format(
				endOfDay(new Date(endDate)),
				"yyyy-MM-dd'T'HH:mm:ssXXX"
			),
		});
	}, []);

	// Handle changes to the start and end dates
	const handleStartDateChange = (e) => {
		const newStartDate = e.target.value;
		setStartDate(newStartDate);
		setDateRange((prev) => ({
			...prev,
			startDate: format(
				startOfDay(new Date(newStartDate)),
				"yyyy-MM-dd'T'HH:mm:ssXXX"
			),
		}));
	};

	const handleEndDateChange = (e) => {
		const newEndDate = e.target.value;
		setEndDate(newEndDate);
		setDateRange((prev) => ({
			...prev,
			endDate: format(
				endOfDay(new Date(newEndDate)),
				"yyyy-MM-dd'T'HH:mm:ssXXX"
			),
		}));
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
