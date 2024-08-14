import React from 'react';

const ProductDetails = ({ product, auction, auctionEnd }) => (
	<div className='flex-1 rounded-lg'>
		<h1 className='text-3xl font-bold text-headerColour mb-4'>
			{product?.title}
		</h1>
		<p className='text-base text-bodyTextColour mb-6'>
			{product?.description}
		</p>
	</div>
);

export default ProductDetails;
