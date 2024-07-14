export const validateCategory = (category) => {
	if (!category || category.length < 2) {
		return 'Category should not be empty or single letter';
	}
	return '';
};

export const validateTitle = (title) => {
	if (!title || title.trim().split(' ').length > 1) {
		return 'Title should not be empty or more than a word';
	}
	return '';
};

export const validateDates = (startDate, endDate) => {
	const today = new Date().toISOString().split('T')[0];
	if (!startDate || startDate < today) {
		return 'Start date should not be empty and should be today or later';
	}
	if (!endDate || endDate <= startDate) {
		return 'End date should not be empty and should be after start date';
	}
	return '';
};

export const validatePrices = (initialPrize, buyNowPrize) => {
	if (initialPrize >= buyNowPrize) {
		return 'Initial prize should be greater than buy now prize';
	}
	return '';
};

export const validateImages = (images) => {
	if (images.length === 0) {
		return 'At least one photo should be there';
	}
	return '';
};

export const validateLocation = (selectedState, currentLocation) => {
	if (!selectedState && !currentLocation) {
		return 'State or current location should be given';
	}
	return '';
};
