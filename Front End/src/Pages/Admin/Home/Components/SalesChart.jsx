import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import useSales from '../../../../CustomHooks/useSales';
import { extractSalesData, xAxisValueFormatter } from './Helpers';

const SalesChart = () => {
	const currentDate = new Date();
	let previousMonth = currentDate.getMonth() - 1;
	let year = currentDate.getFullYear();

	// Adjust year and month if the current month is January
	if (previousMonth < 0) {
		previousMonth = 11; // December
		year -= 1;
	}

	const firstDayOfPreviousMonth = new Date(year, previousMonth, 1);

	const [startDate, setStartDate] = useState(
		firstDayOfPreviousMonth.toISOString().slice(0, 10)
	);
	const [endDate, setEndDate] = useState(
		currentDate.toISOString().slice(0, 10)
	);
	const [periods, setPeriods] = useState([]);
	const [salesCounts, setSalesCounts] = useState([]);
	const [isMonthly, setIsMonthly] = useState(false);

	// Fetch sales data based on the selected date range
	const { data, isLoading, error } = useSales(startDate, endDate);

	useEffect(() => {
		if (data) {
			const [extractedPeriods, extractedSalesCounts, isMonthly] =
				extractSalesData(data);
			setIsMonthly(isMonthly);
			setPeriods(extractedPeriods.map((period) => new Date(period)));
			setSalesCounts(extractedSalesCounts);
		}
	}, [data]);

	const handleStartDateChange = (e) => {
		setStartDate(e.target.value);
	};

	const handleEndDateChange = (e) => {
		setEndDate(e.target.value);
	};

	if (error)
		return <div className='text-errorColour'>Error: {error.message}</div>;

	return (
		<div className='flex flex-col bg-sectionBgColour2  rounded-lg shadow-sm border border-cardBorderColour p-5'>
			<div className='flex justify-between items-center mb-4 text-headerColour'>
				<div className='font-semibold'>Sales</div>
				<div className='flex gap-2'>
					<input
						type='date'
						value={startDate}
						onChange={handleStartDateChange}
						className='p-2 border border-cardBorderColour rounded-md bg-white text-bodyTextColour'
					/>
					<input
						type='date'
						value={endDate}
						onChange={handleEndDateChange}
						className='p-2 border border-cardBorderColour rounded-md bg-white text-bodyTextColour'
					/>
				</div>
			</div>
			<div className='flex justify-center'>
				{isLoading ? (
					<div className='text-bodyTextColour'>Loading...</div>
				) : periods && periods.length > 0 ? (
					<LineChart
						height={500}
						width={700}
						xAxis={[
							{
								data: periods,
								valueFormatter: (value) =>
									xAxisValueFormatter(value),
								scaleType: 'utc',
							},
						]}
						series={[
							{
								data: salesCounts,
								label: 'Sales',
								color: '#29A32C',
							},
						]}
					/>
				) : (
					<div className='text-bodyTextColour'>
						No data available for the selected period.
					</div>
				)}
			</div>
		</div>
	);
};

export default SalesChart;
