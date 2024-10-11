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

const formatDateForDateTimeLocal = (dateString) => {
	const date = new Date(dateString);
	const pad = (n) => (n < 10 ? '0' + n : n);

	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
		date.getDate()
	)}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export { formatLocalDateTime, formatUTCDateTime, formatDateForDateTimeLocal };
