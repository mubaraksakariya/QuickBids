import React from 'react';

const ProfileImageManager = ({ image, onAddImage, onDeleteImage }) => {
	// Function to handle image addition
	const handleAddImage = (e) => {
		const newImageFile = e.target.files[0];
		if (newImageFile) {
			const newImageObj = {
				id: Date.now(),
				file: newImageFile,
				preview: URL.createObjectURL(newImageFile),
			};
			onAddImage(newImageObj);
		}
	};

	return (
		<div className='space-y-4 mt-4'>
			<h3 className='text-lg font-semibold text-headerColour'>
				Manage Profile Image
			</h3>
			<div className='flex gap-4'>
				{image ? (
					<div className='relative'>
						<img
							src={image?.preview || image}
							alt='Profile'
							className='w-32 h-32 object-cover rounded-full shadow-lg'
						/>
						<button
							onClick={() => onDeleteImage(image.id)}
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
					</div>
				) : (
					<p className='text-gray-500'>No profile image set</p>
				)}
			</div>
			<div className='space-y-2'>
				<label className='block text-sm font-medium text-gray-700'>
					Upload New Profile Image
				</label>
				<input
					type='file'
					onChange={handleAddImage}
					className='border-gray-300 rounded-md shadow-sm p-2 focus:ring-2 focus:ring-buttonColour1'
				/>
			</div>
		</div>
	);
};

export default ProfileImageManager;
