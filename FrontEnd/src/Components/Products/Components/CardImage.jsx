import React from 'react';

const CardImage = ({ product, onClick }) => {
	return (
		<div
			className='w-full aspect-video overflow-hidden cursor-pointer rounded-t-lg'
			onClick={onClick}>
			<img
				className='w-full h-full opacity-80 object-contain transition-all duration-200 hover:scale-105 hover:opacity-100'
				src={product.images[0].image}
				alt='Card Image'
			/>
		</div>
	);
};

export default CardImage;
