import React from 'react';
import ImageItem from './ImageItem';

function ImageGridInput({ images, setImages, error }) {
	const handleImageChange = (file, index) => {
		const newImages = [...images];
		newImages[index] = file;
		setImages(newImages);
	};

	return (
		<div className='mt-4 p-4 mx-auto bg-white rounded-xl shadow-md space-y-4 w-full relative '>
			<div className='grid grid-cols-2 gap-4'>
				{Array.from({ length: 6 }).map((_, index) => (
					<ImageItem
						key={index}
						onImageChange={handleImageChange}
						index={index}
					/>
				))}
			</div>
			<span className=' absolute text-errorColour text-sm'>{error}</span>
		</div>
	);
}

export default ImageGridInput;
