import React from 'react';
import Card from './Card';
import useProducts from '../../CustomHooks/useProducts';
import NoProduct from './Components/NoProduct';

function Products({ searchString, selectedCategory }) {
	const {
		data: products,
		error,
		isLoading,
	} = useProducts(searchString, selectedCategory);

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
