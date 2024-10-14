import React from 'react';
import { getAddress } from '../../../../Components/Utilities/gpsLocation';

const LocationCell = ({ locationString, fallbackState }) => {
	const location = getAddress(locationString);

	if (location)
		return (
			<div className=' px-6 py-4'>
				<p>{location.latitude}</p>
				<p>{location.longitude}</p>
			</div>
		);
	if (fallbackState) return <td className='px-6 py-4'>{fallbackState}</td>;
	else return <p>No location info</p>;
};

export default LocationCell;
