import React from 'react';

const ProductImage = ({ product, baseUrl, onClick }) => (
	<div
		className='w-full aspect-video overflow-hidden cursor-pointer max-w-[22rem] rounded-lg'
		onClick={onClick}>
		<img
			className='w-full h-full object-cover transition duration-200 hover:scale-105'
			src={baseUrl + product?.images[0]?.image}
			alt='Card Image'
		/>
	</div>
);

export default ProductImage;
