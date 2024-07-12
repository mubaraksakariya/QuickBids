import React from 'react';
import Card from './Card';

function Products() {
	const products = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	return (
		<div className='p-2 grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
			{products.map((p, index) => (
				<div className='flex justify-center' key={p}>
					<Card />
				</div>
			))}
		</div>
	);
}

export default Products;
