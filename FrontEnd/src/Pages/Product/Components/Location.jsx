import React, { useState } from 'react';
import StateSelector from './StateSelector';
import CurrentLocationSelector from './CurrentLocationSelector';

function Location({
	selectedState,
	setSelectedState,
	currentLocation,
	setCurrentLocation,
	error,
}) {
	const [activeTab, setActiveTab] = useState('state'); // Track the active tab

	const handleTabClick = (tab) => {
		setActiveTab(tab);
		if (tab === 'state') {
			setCurrentLocation(null);
		} else {
			setSelectedState('');
		}
	};

	return (
		<div className='mt-2 w-full relative'>
			<div className='flex mb-4 gap-5 justify-center'>
				<button
					className={`px-4 py-2 border-b ${
						activeTab === 'state'
							? ' border-black'
							: 'border-themeBgColour '
					}`}
					onClick={() => handleTabClick('state')}>
					Select State
				</button>
				<button
					className={`px-4 py-2 border-b ${
						activeTab === 'location'
							? 'border-black'
							: 'border-themeBgColour '
					}`}
					onClick={() => handleTabClick('location')}>
					Use Current Location
				</button>
			</div>
			{activeTab === 'state' && (
				<StateSelector
					selectedState={selectedState}
					setSelectedState={setSelectedState}
					setCurrentLocation={setCurrentLocation}
				/>
			)}
			{activeTab === 'location' && !error && (
				<CurrentLocationSelector
					setCurrentLocation={setCurrentLocation}
					setSelectedState={setSelectedState}
					currentLocation={currentLocation}
				/>
			)}
			<span className=' absolute text-errorColour text-sm'>{error}</span>
		</div>
	);
}

export default Location;
