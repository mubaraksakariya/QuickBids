import React, { useEffect, useState } from 'react';

function CurrentLocationSelector({
	setCurrentLocation,
	setSelectedState,
	currentLocation,
}) {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (error) {
			const errorShowTime = setTimeout(() => {
				setError('');
			}, 5000);

			return () => clearTimeout(errorShowTime);
		}
	}, [error]);

	const handleCurrentLocation = () => {
		if (navigator.geolocation) {
			setLoading(true);
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setCurrentLocation({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					});
					setSelectedState(''); // Deselect any selected state
					setError('');
					setLoading(false);
				},
				(err) => {
					setError('Error retrieving location: ' + err.message);
					setLoading(false);
				}
			);
		} else {
			setError('Geolocation is not supported by this browser.');
		}
	};

	return (
		<div className='flex justify-center'>
			{loading ? (
				<span className='border rounded-full p-1 cursor-default'>
					Please wait, fetching location...
				</span>
			) : error ? (
				<span className='border rounded-full p-1 cursor-default'>
					{error}
				</span>
			) : (
				<span
					onClick={handleCurrentLocation}
					className={`${
						currentLocation
							? 'border rounded-full p-1 text-button2Colour1 cursor-default'
							: 'border rounded-full p-1 underline cursor-pointer'
					} `}>
					{currentLocation
						? 'Current Location Selected'
						: 'Click to add location'}
				</span>
			)}
		</div>
	);
}

export default CurrentLocationSelector;
