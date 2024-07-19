import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/Navbar/NavBar';
import Products from '../../Components/Products/Products';
import CategoryNav from '../../Components/Category/CategoryNav';

function Home() {
	const [searchString, setSearchSTring] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');

	useEffect(() => {
		console.log(searchString);
	}, [searchString]);

	return (
		<div className='min-h-[100dvh] w-full lg:w-[90%] bg-themeBgColour'>
			<NavBar setSearchSTring={setSearchSTring} />
			<CategoryNav setSelectedCategory={setSelectedCategory} />
			<Products
				searchString={searchString}
				selectedCategory={selectedCategory}
			/>
		</div>
	);
}

export default Home;
