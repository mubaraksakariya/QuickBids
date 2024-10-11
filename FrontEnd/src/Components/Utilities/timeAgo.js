function timeAgo(dateString) {
	const date = new Date(dateString);
	const now = new Date();
	const diff = now - date; // Difference in milliseconds

	const second = 1000;
	const minute = 60 * second;
	const hour = 60 * minute;
	const day = 24 * hour;
	const week = 7 * day;
	const month = 30 * day; // Approximation
	const year = 365 * day; // Approximation

	if (diff < minute) {
		const seconds = Math.floor(diff / second);
		return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
	} else if (diff < hour) {
		const minutes = Math.floor(diff / minute);
		return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
	} else if (diff < day) {
		const hours = Math.floor(diff / hour);
		return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
	} else if (diff < week) {
		const days = Math.floor(diff / day);
		return `${days} ${days === 1 ? 'day' : 'days'} ago`;
	} else if (diff < month) {
		const weeks = Math.floor(diff / week);
		return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
	} else if (diff < year) {
		const months = Math.floor(diff / month);
		return `${months} ${months === 1 ? 'month' : 'months'} ago`;
	} else {
		const years = Math.floor(diff / year);
		return `${years} ${years === 1 ? 'year' : 'years'} ago`;
	}
}
export default timeAgo;
