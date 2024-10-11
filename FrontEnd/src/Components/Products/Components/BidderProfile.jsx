import React from 'react';

export const BidderProfile = ({ user }) => {
	return (
		<div
			className='cursor-pointer border border-gray-300 bg-sectionBgColour1 hover:bg-sectionBgColour3 transition duration-200 shadow-lg rounded-xl'
			onClick={() => console.log(user)}>
			<div className='flex gap-3 items-center p-1 '>
				<div className='rounded-full overflow-hidden aspect-square w-9'>
					<img
						className='w-full h-full object-cover'
						src={user.profile_picture}
						alt={`${user?.first_name}'s profile`}
					/>
				</div>
				<div className='flex flex-col'>
					<p className='text-sm font-semibold text-headerColour truncate'>
						{user?.first_name}
					</p>
					<p className='text-xs text-bodyTextColour truncate'>
						{user?.email}
					</p>
				</div>
			</div>
		</div>
	);
};
