import React from 'react';

function ProductDetails({
	title,
	setTitle,
	description,
	setDescription,
	error,
}) {
	return (
		<div className=' w-full relative'>
			<div className=' py-3'>
				<h2 className=' pb-2'>Include some details</h2>
				<label
					htmlFor='title'
					className='block text-xs  font-medium text-gray-900 dark:text-white'>
					Ad title
				</label>
				<input
					onChange={(e) => setTitle(e.target.value)}
					value={title}
					type='text'
					id='title'
					className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					placeholder='Title'
					required
				/>
				<span className=' absolute text-errorColour text-sm'>
					{error}
				</span>
			</div>
			<div className=' pt-2'>
				<label
					htmlFor='Description'
					className='block text-xs font-medium text-gray-900 dark:text-white'>
					Description
				</label>
				<textarea
					onChange={(e) => setDescription(e.target.value)}
					value={description}
					id='Description'
					rows='4'
					className='block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					placeholder='Write your thoughts here...'
				/>
			</div>
		</div>
	);
}

export default ProductDetails;
