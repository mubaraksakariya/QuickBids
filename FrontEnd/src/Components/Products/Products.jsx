import React, { useEffect } from 'react';
import Card from './Card';
import NoProduct from './Components/NoProduct';
import { useProductContext } from '../../Context/ProductContext';

function Products({ searchString, selectedCategory }) {
	const {
		products,
		error,
		isLoading,
		setSearchString,
		setSelectedCategory,
		manageNextPage,
		hasMore,
	} = useProductContext();

	useEffect(() => {
		if (searchString !== undefined || searchString !== '')
			setSearchString(searchString);
		if (selectedCategory !== undefined || selectedCategory !== '')
			setSelectedCategory(selectedCategory);
	}, [searchString, selectedCategory]);

	return (
		<>
			<div className='mt-4 flex flex-wrap gap-4 justify-around md:justify-center'>
				{error && (
					<div className='text-center text-errorColour'>
						Error loading products
					</div>
				)}
				{isLoading && (
					<div className='text-center text-errorColour'>
						Loading...
					</div>
				)}
				{products?.length > 0 ? (
					products?.map((item) => (
						<Card product={item} key={item.id} />
					))
				) : (
					<NoProduct />
				)}
			</div>
			<div className='flex justify-center pb-2 '>
				{hasMore && (
					<span
						onClick={manageNextPage}
						className='cursor-pointer  hover:scale-[1.2] transition-all ease-in-out'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='size-5'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5'
							/>
						</svg>
					</span>
				)}
			</div>
		</>
	);
}

export default Products;
