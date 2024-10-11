import React, { useState, useEffect } from 'react';

const ImageManager = ({ images, onAddImage, onDeleteImage }) => {
	const [newImageFile, setNewImageFile] = useState(null);
	const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

	const handleAddImage = () => {
		if (newImageFile) {
			const newImageObj = {
				id: Date.now(),
				file: newImageFile,
				preview: URL.createObjectURL(newImageFile),
			};
			onAddImage(newImageObj);
			setNewImageFile(null);
		}
	};

	useEffect(() => {
		handleAddImage();
	}, [newImageFile]);

	return (
		<div className='space-y-4 mt-4'>
			<h3 className='text-lg font-semibold text-headerColour'>
				Manage Images
			</h3>
			<ul className='flex gap-4'>
				{images.map((img) => (
					<li key={img.id} className='relative'>
						<img
							src={img.preview || SERVER_BASE_URL + img.image}
							alt='Product'
							className='w-32 h-32 object-cover rounded-lg shadow-lg'
						/>
						<button
							onClick={() => onDeleteImage(img.id)}
							className='absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full hover:bg-red-700'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-4 h-4'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</li>
				))}
			</ul>
			<div className='space-y-2'>
				<input
					type='file'
					onChange={(e) => setNewImageFile(e.target.files[0])}
					className='border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-buttonColour1'
				/>
			</div>
		</div>
	);
};

export default ImageManager;
