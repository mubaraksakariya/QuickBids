import React from 'react';

const BlockUser = ({ user, onBlockChange }) => {
	const isBlocked = user.is_blocked;

	const handleBlockChange = () => {
		onBlockChange(true); // Set user as blocked
	};

	const handleUnblockChange = () => {
		onBlockChange(false); // Set user as unblocked
	};

	return (
		<div className='mt-6 p-6 bg-sectionBgColour5 rounded-lg shadow-md'>
			{isBlocked ? (
				<div>
					<h3 className='text-xl font-semibold text-headerColour mb-3'>
						User is currently blocked
					</h3>
					<div className='flex items-center space-x-3'>
						<input
							type='checkbox'
							onChange={handleUnblockChange}
							className='form-checkbox h-6 w-6 text-green-500 rounded-lg border-green-300 focus:ring-green-400 transition duration-200 ease-in-out hover:scale-105'
						/>
						<span className='text-bodyTextColour text-base'>
							Unblock User
						</span>
					</div>
				</div>
			) : (
				<div>
					<h3 className='text-xl font-semibold text-headerColour mb-3'>
						Block user?
					</h3>
					<div className='flex items-center space-x-3'>
						<input
							type='checkbox'
							onChange={handleBlockChange}
							className='form-checkbox h-6 w-6 text-red-500 rounded-lg border-red-300 focus:ring-red-400 transition duration-200 ease-in-out hover:scale-105'
						/>
						<span className='text-bodyTextColour text-base'>
							Block User
						</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default BlockUser;
