import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
	return (
		<div className='py-10 flex flex-col items-center justify-center bg-sectionBgColour1 text-center'>
			<img
				src='/404.jpeg'
				alt='Page Not Found'
				className='w-1/2 max-w-md mb-8'
			/>
			<h1 className='text-3xl font-bold text-headerColour'>
				Page Not Found
			</h1>

			<p className='text-bodyTextColour mt-4'>
				The product you are looking for does not exist or has been
				removed.
			</p>
			<Link to='/' className='mt-6 text-button2Colour2 hover:underline'>
				Go back to Home
			</Link>
		</div>
	);
};

export default PageNotFound;
