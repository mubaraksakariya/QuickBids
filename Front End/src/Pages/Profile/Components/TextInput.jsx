import React from 'react';

const TextInput = ({
	label,
	value,
	onChange,
	placeholder,
	required = false,
	type = 'text',
}) => (
	<div className='mb-6'>
		<label
			htmlFor={label}
			className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
			{label}
		</label>
		<input
			required={required}
			type={type}
			id={label}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
		/>
	</div>
);

export default TextInput;
