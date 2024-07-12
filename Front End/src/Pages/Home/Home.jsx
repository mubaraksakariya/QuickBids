import React from 'react';
import NavBar from '../../Components/Navbar/NavBar';
import Products from '../../Components/Products/Products';

function Home() {
	return (
		<div className='min-h-[100dvh] w-full lg:w-[90%] bg-themeBgColour'>
			<NavBar />
			<Products />
		</div>
	);
}

export default Home;
