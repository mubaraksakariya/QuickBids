const getAddress = (locationString) => {
	try {
		// Parse the location string
		const location = JSON.parse(locationString);
		// Return parsed latitude and longitude
		return {
			latitude: location.latitude,
			longitude: location.longitude,
		};
	} catch (error) {
		console.error('Error parsing location string:', error);
		return null;
	}
};
export { getAddress };
