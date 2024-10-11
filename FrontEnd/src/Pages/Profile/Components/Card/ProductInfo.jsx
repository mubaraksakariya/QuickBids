import React from 'react';

const ProductInfo = ({ product, onClick }) => (
	<div className='border-b mb-2 pb-2 border-cardBorderColour lg:min-h-[7.5rem]'>
		<a className='cursor-pointer' onClick={onClick}>
			<h5
				title={product?.title}
				className='mb-2 text-xl font-bold tracking-tight text-headerColour dark:text-white text-wrap overflow-hidden max-h-8 line-clamp-2'>
				{product?.title}
			</h5>
		</a>
		<p
			className='mb-3 text-sm font-normal text-bodyTextColour dark:text-gray-400 line-clamp-3'
			title={product?.description}>
			{product?.description}
		</p>
	</div>
);

export default ProductInfo;
