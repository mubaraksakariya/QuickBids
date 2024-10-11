const convertExpiryDate = (expiryDate) => {
	const [month, year] = expiryDate.split('/');
	// Assuming expiry date is the last day of the given month
	const lastDayOfMonth = new Date(`20${year}`, month, 0).getDate(); // '20' + year to handle '25' as '2025'
	return `${year.length === 2 ? '20' + year : year}-${String(month).padStart(
		2,
		'0'
	)}-${lastDayOfMonth}`;
};

const convertDateToExpiryString = (dateString) => {
	const date = new Date(dateString);
	const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-based index
	const year = String(date.getFullYear()).slice(-2); // get last two digits of the year
	return `${month}/${year}`;
};

export { convertExpiryDate, convertDateToExpiryString };
