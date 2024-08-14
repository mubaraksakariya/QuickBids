import React from 'react';
import ImageSlider from '../ImageSlider';

const ProductImageSection = ({ images, isLoading }) => {
	const imageUrls = images?.map((item) => item.image);
	return (
		<div className='flex-1 flex bg-white justify-center items-center shadow-lg rounded-lg p-4'>
			{isLoading || !imageUrls ? (
				<p className='text-center text-lg text-gray-500'>Loading...</p>
			) : (
				<ImageSlider images={imageUrls} />
			)}
		</div>
	);
};

export default ProductImageSection;
