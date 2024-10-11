import React, { useState } from 'react';

const SearchBar = ({ setSearchSTring }) => {
	const [searchQuery, setSearchQuery] = useState('');

	const manageSearch = (event) => {
		event.preventDefault();
		setSearchSTring(searchQuery);
	};

	return (
		<form
			onSubmit={manageSearch}
			className='relative mt-4 lg:mt-0 lg:ml-4 mx-3'>
			<div className='relative flex items-center'>
				<input
					type='text'
					placeholder='Search...'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className='bg-white text-black placeholder-gray-400 border-none py-2 px-4 rounded-md w-full lg:w-64 pe-10'
				/>
				<button type='submit' onClick={manageSearch}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='size-8 absolute right-2 top-1/2 transform -translate-y-1/2 opacity-60'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
						/>
					</svg>
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
