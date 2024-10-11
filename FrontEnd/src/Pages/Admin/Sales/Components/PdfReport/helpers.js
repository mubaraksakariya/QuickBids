// Helper function to format the date
export const formatDate = (date) => new Date(date).toLocaleDateString();

// Helper function to calculate total sales
export const calculateTotalSales = (sales) => {
	return sales?.reduce(
		(total, auction) =>
			total +
			(auction.winning_bid
				? Number(auction.winning_bid.amount)
				: Number(auction.product.buy_now_prize)),
		0
	);
};
