import React from 'react';

function CarouselItem({ product, onClick }) {
	const imageUrl =
		product.images.length > 0
			? product.images[0].image
			: 'default_image_url_here';

	return (
		<div className='flex justify-center items-center h-full'>
			<div
				className='flex flex-col md:flex-row justify-center items-center w-full h-full md:h-[60dvh] cursor-pointer'
				onClick={() => onClick(product)}>
				<div className='flex flex-col md:flex-row justify-center items-center w-full h-full'>
					{/* gradient-bg-left, text-visible are custom classes */}
					<div className='w-full h-full flex justify-center items-center md:w-[35%] gradient-bg-left text-white text-visible p-4'>
						<div className='flex flex-col justify-center items-center'>
							<div>
								<h1 className='font-extrabold text-lg md:text-xl lg:text-2xl'>
									{product.title}
								</h1>
							</div>
						</div>
					</div>
					<div className='w-full md:w-[30%] h-full bg-white flex justify-center items-center'>
						<img
							src={imageUrl}
							alt={product.title}
							className='object-contain w-full h-full max-h-[40dvh] md:max-h-[50dvh]'
						/>
					</div>
					{/* gradient-bg-right, text-visible are custom classes */}
					<div className='w-full h-full flex justify-center items-center md:w-[35%] gradient-bg-right text-white text-visible p-4'>
						<div className='flex flex-col justify-center items-center'>
							<div>
								<p className='mt-2 md:mt-0 md:ml-4 md:block hidden'>
									{product.description}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CarouselItem;
