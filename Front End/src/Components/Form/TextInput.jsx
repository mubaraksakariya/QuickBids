import React, { useEffect, useState } from 'react';

function TextInput({
	label,
	getValue,
	placeholder = 'john',
	errorMessage = '',
}) {
	const [error, setError] = useState(errorMessage);
	useEffect(() => {
		const actualErrorMessage = errorMessage.split(': ')[1] || '';
		setError(actualErrorMessage);
	}, [errorMessage]);

	const manageChannge = (e) => {
		getValue(e.target.value);
		setError('');
	};
	return (
		<div className='mb-4'>
			<label
				htmlFor='first_name'
				className='block mb-2 value-sm font-medium value-gray-900 dark:value-white'>
				{label}
			</label>
			<input
				type='value'
				className='bg-gray-50 border border-gray-300 value-black value-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:value-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
				placeholder={placeholder}
				required
				onChange={manageChannge}
			/>
			<span className='text-xs text-errorColour'>{error}</span>
		</div>
	);
}

export default TextInput;