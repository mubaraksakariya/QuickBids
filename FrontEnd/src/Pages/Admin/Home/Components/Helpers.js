export function extractSalesData(data) {
	// Determine if the data is monthly
	const isMonthly = data.every(
		(item) => new Date(item.period).getDate() === 1
	);

	let periods, salesCounts;

	// if (isMonthly) {
	// 	// Extract months if the data is aggregated by month
	// 	periods = data.map((item) =>
	// 		new Date(item.period).toISOString().slice(0, 7)
	// 	); // Get month as YYYY-MM
	// } else {
	// 	// Extract full dates if the data is aggregated by day
	// 	periods = data.map(
	// 		(item) => new Date(item.period).toISOString().split('T')[0]
	// 	); // Get date as YYYY-MM-DD
	// }
	periods = data.map(
		(item) => new Date(item.period).toISOString().split('T')[0]
	);
	salesCounts = data.map((item) => Number(item.sales_count));

	return [periods, salesCounts, isMonthly];
}

export const xAxisValueFormatter = (value) => {
	const isMonthly = new Date(value).getDate() === 1;
	if (isMonthly) {
		return new Date(value).toISOString().slice(0, 7);
	}

	return new Date(value).toISOString().split('T')[0];
};
