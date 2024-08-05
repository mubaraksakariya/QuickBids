const formatLocalDateTime = (date) => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	return `${year}-${month}-${day}T${hours}:${minutes}`;
};

function formatUTCDateTime(date) {
	// Ensure the date is a Date object
	if (!(date instanceof Date)) {
		throw new Error('Input must be a Date object');
	}
	// Convert to ISO 8601 string and slice to 'YYYY-MM-DDTHH:MM' format
	return date.toISOString().slice(0, 16);
}

export { formatLocalDateTime, formatUTCDateTime };
