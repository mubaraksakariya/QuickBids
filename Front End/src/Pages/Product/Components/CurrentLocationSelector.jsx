import React, { useState } from 'react';

function CurrentLocationSelector({
	setCurrentLocation,
	setSelectedState,
	currentLocation,
}) {
	const [error, setError] = useState('');

	const handleCurrentLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setCurrentLocation({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					});
					// setCurrentLocation(true);
					setSelectedState(''); // Deselect any selected state
					setError('');
				},
				(err) => {
					setError('Error retrieving location: ' + err.message);
				}
			);
		} else {
			setError('Geolocation is not supported by this browser.');
		}
	};

	return (
		<div className=' flex justify-center'>
			<button
				onClick={handleCurrentLocation}
				className={`${
					currentLocation ? '' : 'border rounded-full p-1'
				} `}>
				{currentLocation
					? 'Current Location Selected'
					: 'click to add loaction'}
			</button>
			{error && <p>{error}</p>}
		</div>
	);
}

export default CurrentLocationSelector;
