import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ImageSlider = ({ images }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const goToPrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		);
	};

	const goToNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1
		);
	};

	const goToSlide = (index) => {
		setCurrentIndex(index);
	};

	return (
		<div className='relative w-full mx-auto'>
			<div className='relative'>
				<div className=''>
					<img
						src={images[currentIndex]}
						alt={`Slide ${currentIndex + 1}`}
						className='w-full h-auto'
					/>
				</div>
				{/* Previous Button */}
				<button
					className='absolute top-1/2 left-0 transform -translate-y-1/2 h-full'
					onClick={goToPrevious}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='size-10'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
						/>
					</svg>
				</button>

				{/* Next Button */}
				<button
					className='absolute top-1/2 right-0 transform -translate-y-1/2 h-full'
					onClick={goToNext}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='size-10'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
						/>
					</svg>
				</button>
			</div>
			<div className='flex justify-center m-2'>
				{images.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`w-3 h-3 mx-1 rounded-full ${
							currentIndex === index
								? 'bg-gray-800'
								: 'bg-gray-300'
						}`}></button>
				))}
			</div>
		</div>
	);
};

// PropTypes for validation
ImageSlider.propTypes = {
	images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageSlider;
