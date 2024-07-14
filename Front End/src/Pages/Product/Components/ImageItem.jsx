import React, { useState, useRef, useEffect } from 'react';

function ImageItem({ onImageChange, index }) {
	const [image, setImage] = useState(null);
	const [imageURL, setImageURL] = useState('');
	const inputRef = useRef(null);

	useEffect(() => {
		if (image) {
			const url = URL.createObjectURL(image);
			setImageURL(url);
			return () => URL.revokeObjectURL(url);
		}
	}, [image]);

	const handleInputClick = () => {
		inputRef.current.click();
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(file);
			onImageChange(file, index);
		}
	};

	const handleRemove = () => {
		setImage(null);
		setImageURL('');
		onImageChange(null, index);
	};

	return (
		<div className='relative flex justify-center'>
			{image ? (
				<>
					<img
						src={imageURL}
						alt='Selected'
						className='w-40 h-40 object-cover rounded-md'
					/>
					<button
						onClick={handleRemove}
						className='absolute top-1 right-1 px-2 py-1 text-xs font-medium text-white bg-red-500 rounded-full hover:bg-red-600'>
						&times;
					</button>
				</>
			) : (
				<button
					onClick={handleInputClick}
					className='w-40 h-40 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500'>
					Add Image
				</button>
			)}
			<input
				type='file'
				accept='image/*'
				ref={inputRef}
				onChange={handleImageChange}
				className='hidden'
			/>
		</div>
	);
}

export default ImageItem;
