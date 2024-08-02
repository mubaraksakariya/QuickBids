import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/Navbar/NavBar';
import Products from '../../Components/Products/Products';
import CategoryNav from '../../Components/Category/CategoryNav';
import HomeCarousel from '../../Components/Carousel/HomeCarousel';
import Footer from '../../Components/Footer/Footer';

function Home() {
	const [searchString, setSearchSTring] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');

	useEffect(() => {
		console.log(searchString);
	}, [searchString]);

	return (
		<div className='full-page'>
			<NavBar setSearchSTring={setSearchSTring} />
			<div className=' min-h-[80dvh]'>
				{!searchString && <HomeCarousel />}
				<CategoryNav setSelectedCategory={setSelectedCategory} />
				<Products
					searchString={searchString}
					selectedCategory={selectedCategory}
				/>
			</div>
			<Footer />
		</div>
	);
}

export default Home;
