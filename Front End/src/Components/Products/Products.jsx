import React from 'react';
import Card from './Card';
import useProducts from '../../CustomHooks/useProducts';

function Products({ searchString, selectedCategory }) {
	const {
		data: products,
		error,
		isLoading,
	} = useProducts(searchString, selectedCategory);

	return (
		// <div className='p-2 grid gap-1 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
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
				<div className=' w-full min-h-[20rem] flex justify-center items-center'>
					<div className=' flex-grow'>
						<div className=''>
							<h1 className='text-3xl text-center'>
								No products available at the moment
							</h1>
						</div>
						<div className=''>
							<p className=' text-center'>Come back later</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Products;
