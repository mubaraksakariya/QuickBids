import React, { useEffect, useState } from 'react';

function DateRangeInput({ startDate, setStartDate, endDate, setEndDate }) {
	const [startDateError, setStartDateError] = useState('');
	const [endDateError, setEndDateError] = useState('');

	useEffect(() => {
		const today = new Date();
		const formattedToday = today.toISOString().slice(0, 16); // Format to YYYY-MM-DDTHH:MM
		setStartDate(formattedToday);

		const tomorrow = new Date(today);
		tomorrow.setDate(tomorrow.getDate() + 1);
		const formattedTomorrow = tomorrow.toISOString().slice(0, 16); // Format to YYYY-MM-DDTHH:MM
		setEndDate(formattedTomorrow);
	}, []); // Empty dependency array ensures this runs only once

	// Validation functions
	const validateStartDate = (date) => {
		if (!date) {
			return 'Start date and time are required';
		}
		const currentDateTime = new Date().toISOString().slice(0, 16);
		if (date < currentDateTime) {
			return 'Start date and time must be today or later';
		}
		return '';
	};

	const validateEndDate = (date) => {
		if (!date) {
			return 'End date and time are required';
		}
		if (date <= startDate) {
			return 'End date and time must be after start date and time';
		}
		return '';
	};

	// Event handlers
	const handleStartDateChange = (e) => {
		const newStartDate = e.target.value;
		const error = validateStartDate(newStartDate);
		setStartDateError(error);
		if (!error) {
			setStartDate(newStartDate);

			// Ensure end date is at least one day after new start date
			const nextDay = new Date(newStartDate);
			nextDay.setDate(nextDay.getDate() + 1);
			const formattedNextDay = nextDay.toISOString().slice(0, 16); // Format to YYYY-MM-DDTHH:MM
			setEndDate(formattedNextDay);
			setEndDateError(validateEndDate(formattedNextDay));
		}
	};

	const handleEndDateChange = (e) => {
		const newEndDate = e.target.value;
		const error = validateEndDate(newEndDate);
		setEndDateError(error);
		if (!error) {
			setEndDate(newEndDate);
		}
	};

	return (
		<div className='flex gap-4'>
			<div className='w-full'>
				<label className='block text-sm font-medium text-gray-700'>
					Start Date and Time
				</label>
				<input
					type='datetime-local'
					className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
					value={startDate}
					onChange={handleStartDateChange}
					onBlur={() =>
						setStartDateError(validateStartDate(startDate))
					}
					min={new Date().toISOString().slice(0, 16)}
				/>
				{startDateError && (
					<p className='text-red-500 text-sm mt-1'>
						{startDateError}
					</p>
				)}
			</div>
			<div className='w-full'>
				<label className='block text-sm font-medium text-gray-700'>
					End Date and Time
				</label>
				<input
					type='datetime-local'
					className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
					value={endDate}
					onChange={handleEndDateChange}
					onBlur={() => setEndDateError(validateEndDate(endDate))}
					min={startDate} // Set min attribute to the start date and time
				/>
				{endDateError && (
					<p className='text-red-500 text-sm mt-1'>{endDateError}</p>
				)}
			</div>
		</div>
	);
}

export default DateRangeInput;
