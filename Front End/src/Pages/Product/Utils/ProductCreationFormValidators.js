export const validateCategory = (category) => {
	if (!category || category.length < 2) {
		return 'Category should not be empty or single letter';
	}
	return '';
};

export const validateTitle = (title) => {
	if (!title) {
		return 'Title should not be empty';
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
	if (Number(initialPrize) >= Number(buyNowPrize)) {
		return 'Initial prize should not be greater than buy now prize';
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

export const validateProxyAmount = (
	maxProxy,
	incriment,
	highestBid,
	auction,
	product
) => {
	if (!maxProxy | !incriment)
		return {
			message: 'Enter a proxy value and inciriment',
		};
	const recentBid =
		(highestBid && highestBid?.amount) || auction.initial_prize;

	if (maxProxy <= recentBid)
		return {
			message:
				'Enter a proxy bid amount greater than the current bid or the initial value',
		};

	if (incriment < (maxProxy - recentBid) / 20)
		return {
			message: `Enter a valid incriment value, minimum value is ${
				(maxProxy - recentBid) / 20
			}`,
		};
	if (Number(recentBid) + Number(incriment) > Number(maxProxy))
		return {
			message: `Enter a valid incriment value, maximum value is ${
				maxProxy - recentBid
			}`,
		};
};
