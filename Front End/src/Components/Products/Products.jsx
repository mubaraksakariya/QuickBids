import React, { useEffect } from 'react';
import Card from './Card';
import NoProduct from './Components/NoProduct';
import { useProductContext } from '../../Context/ProductContext';

function Products({ searchString, selectedCategory }) {
	const { products, error, isLoading, setSearchString, setSelectedCategory } =
		useProductContext();

	useEffect(() => {
		if (searchString !== undefined || searchString !== '')
			setSearchString(searchString);
		if (selectedCategory !== undefined || selectedCategory !== '')
			setSelectedCategory(selectedCategory);
	}, [searchString, selectedCategory]);

	return (
		<div className='mt-4 flex flex-wrap gap-4 justify-around md:justify-center'>
			{isLoading && (
				<div className='text-center text-errorColour'>Loading...</div>
			)}
			{error && (
				<div className='text-center text-errorColour'>
					Error loading products
				</div>
			)}
			{products?.length > 0 ? (
				products?.map((item) => <Card product={item} key={item.id} />)
			) : (
				<NoProduct />
			)}
		</div>
	);
}

export default Products;
