import React from 'react';

const states = [
	'Andhra Pradesh',
	'Arunachal Pradesh',
	'Assam',
	'Bihar',
	'Chhattisgarh',
	'Goa',
	'Gujarat',
	'Haryana',
	'Himachal Pradesh',
	'Jharkhand',
	'Karnataka',
	'Kerala',
	'Madhya Pradesh',
	'Maharashtra',
	'Manipur',
	'Meghalaya',
	'Mizoram',
	'Nagaland',
	'Odisha',
	'Punjab',
	'Rajasthan',
	'Sikkim',
	'Tamil Nadu',
	'Telangana',
	'Tripura',
	'Uttar Pradesh',
	'Uttarakhand',
	'West Bengal',
];

function StateSelector({
	selectedState,
	setSelectedState,
	setCurrentLocation,
}) {
	const handleChange = (e) => {
		setSelectedState(e.target.value);
		setCurrentLocation(null); // Deselect current location
	};

	return (
		<div className=' flex justify-center'>
			<select
				className='m-1'
				id='state-select'
				value={selectedState}
				onChange={handleChange}>
				<option value=''>--Please choose a state--</option>
				{states.map((state) => (
					<option key={state} value={state}>
						{state}
					</option>
				))}
			</select>
		</div>
	);
}

export default StateSelector;
