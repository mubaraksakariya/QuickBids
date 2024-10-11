import React from 'react';

const ProfilePicture = ({ picture, onRemove }) => (
	<div className='flex justify-center w-max'>
		<div className='relative max-w-fit'>
			{picture && (
				<>
					<p className='pb-5'>New profile image</p>
					<div className='rounded-full overflow-hidden w-56'>
						<img
							src={URL.createObjectURL(picture)}
							alt='Profile'
							className='bg-errorColour'
						/>
					</div>
					<button
						className='hover:bg-errorColour active:bg-red-900 rounded-md absolute top-0 right-0'
						onClick={onRemove}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='currentColor'
							className='size-6'>
							<path
								fillRule='evenodd'
								d='M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z'
								clipRule='evenodd'
							/>
						</svg>
					</button>
				</>
			)}
		</div>
	</div>
);

export default ProfilePicture;
