import React, { useEffect, useState } from 'react';

function DateRangeInput({ startDate, setStartDate, endDate, setEndDate }) {
	// const [startDate, setStartDate] = useState('');
	// const [endDate, setEndDate] = useState('');
	const [startDateError, setStartDateError] = useState('');
	const [endDateError, setEndDateError] = useState('');

	useEffect(() => {
		const today = new Date();
		const formattedToday = today.toISOString().split('T')[0]; // Format to YYYY-MM-DD
		setStartDate(formattedToday);

		const tomorrow = new Date(today);
		tomorrow.setDate(tomorrow.getDate() + 1);
		const formattedTomorrow = tomorrow.toISOString().split('T')[0]; // Format to YYYY-MM-DD
		setEndDate(formattedTomorrow);
	}, []);

	// Validation functions
	const validateStartDate = (date) => {
		if (!date) {
			return 'Start date is required';
		}
		const todayDate = new Date().toISOString().split('T')[0];
		if (date < todayDate) {
			return 'Start date must be today or later';
		}
		return '';
	};

	const validateEndDate = (date) => {
		if (!date) {
			return 'End date is required';
		}
		if (date <= startDate) {
			return 'End date must be after start date';
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
			const formattedNextDay = nextDay.toISOString().split('T')[0]; // Format to YYYY-MM-DD
			setEndDate(formattedNextDay);
			setEndDateError(validateEndDate(formattedNextDay));
			setStartDate(newStartDate);
		}
	};

	const handleEndDateChange = (e) => {
		const newEndDate = e.target.value;
		const error = validateEndDate(newEndDate);
		setEndDateError(error);
		if (!error) {
			setEndDate(newEndDate);

			// Update external state in parent component
			setEndDate(newEndDate);
		}
	};

	return (
		<div className='flex gap-4'>
			<div className='w-full'>
				<label className='block text-sm font-medium text-gray-700'>
					Start Date
				</label>
				<input
					type='date'
					className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
					value={startDate}
					onChange={handleStartDateChange}
					onBlur={() =>
						setStartDateError(validateStartDate(startDate))
					}
					min={new Date().toISOString().split('T')[0]} // Set min attribute to today's date
				/>
				{startDateError && (
					<p className='text-red-500 text-sm mt-1'>
						{startDateError}
					</p>
				)}
			</div>
			<div className='w-full'>
				<label className='block text-sm font-medium text-gray-700'>
					End Date
				</label>
				<input
					type='date'
					className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
					value={endDate}
					onChange={handleEndDateChange}
					onBlur={() => setEndDateError(validateEndDate(endDate))}
					min={startDate} // Set min attribute to the start date
				/>
				{endDateError && (
					<p className='text-red-500 text-sm mt-1'>{endDateError}</p>
				)}
			</div>
		</div>
	);
}

export default DateRangeInput;
