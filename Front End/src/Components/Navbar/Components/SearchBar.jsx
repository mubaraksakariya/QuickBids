import React from 'react';

const SearchBar = () => {
	return (
		<div className='relative mt-4 lg:mt-0 lg:ml-4 mx-3'>
			<input
				type='text'
				placeholder='Search...'
				className=' bg-white text-black placeholder-gray-400 border-none py-2 px-4 rounded-md w-full lg:w-64'
			/>
		</div>
	);
};

export default SearchBar;
