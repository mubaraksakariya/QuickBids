export const formatSalesDataForExcel = (sales, fromDate, toDate) => {
	// Calculate the total sales
	const totalSales = sales?.reduce(
		(total, auction) =>
			total +
			(auction.winning_bid
				? Number(auction.winning_bid.amount)
				: Number(auction.product.buy_now_prize)),
		0
	);

	// Report metadata like title, date range, and total
	const reportMetadata = [
		// { Title: 'Sales Report', Date: new Date().toLocaleDateString() },
		// {
		// 	'Date Range': `From: ${new Date(
		// 		fromDate
		// 	).toLocaleDateString()} To: ${new Date(
		// 		toDate
		// 	).toLocaleDateString()}`,
		// },
		// // { Total: `Total Sales: ${totalSales}` },
		// {}, // Empty row for spacing
	];

	// Sales data for the table
	const salesData = sales.map((auction) => ({
		Product: auction.product.title,
		Category: auction.product.category.name,
		'Initial Price': auction.initial_prize,
		'Buy Now Price': auction.product.buy_now_prize || '-',
		'Winning Amount': auction.winning_bid
			? auction.winning_bid.amount
			: auction.product.buy_now_prize,
		Winner: auction.winner ? auction.winner.email : '-',
		Owner: `${auction.product.owner.first_name} ${auction.product.owner.last_name}`,
		'End Date': new Date(auction.end_time).toLocaleDateString(),
	}));

	// Return the combined metadata and sales data
	return [...reportMetadata, ...salesData];
};
