import React from 'react';
import PropTypes from 'prop-types';

const LocalTimeDisplay = ({ timestamp, formatOptions }) => {
	const formatDate = (dateString, options) => {
		const date = new Date(dateString);
		return date.toLocaleString(undefined, options);
	};

	// Default formatting options with AM/PM
	const defaultOptions = {
		weekday: 'short',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		// second: '2-digit',
		hour12: true,
	};

	// Merge default options with provided options
	const options = formatOptions
		? { ...defaultOptions, ...formatOptions }
		: defaultOptions;

	return (
		<div className='text-xs text-gray-500'>
			{formatDate(timestamp, options)}
		</div>
	);
};

LocalTimeDisplay.propTypes = {
	timestamp: PropTypes.string.isRequired,
	formatOptions: PropTypes.object,
};

export default LocalTimeDisplay;
