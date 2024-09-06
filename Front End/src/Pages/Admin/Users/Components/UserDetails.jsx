import React from 'react';
import useUserExtraDetails from '../../../../CustomHooks/useUserExtraDetails';

const UserDetails = ({ user }) => {
	const { data, error, isLoading } = useUserExtraDetails(user.id);
	if (data) console.log(data);
	if (error) console.log(error);

	return (
		<div className='bg-sectionBgColour5 p-6 rounded-lg shadow-md space-y-6'>
			{/* Basic User Information */}
			<div className='flex flex-col items-center'>
				<div className='w-24 h-24 rounded-full overflow-hidden shadow-md'>
					<img
						className='object-cover w-full h-full'
						src={user.profile_picture}
						alt='User Profile'
					/>
				</div>
				<h2 className='mt-4 text-xl font-semibold text-headerColour'>
					{user?.first_name || 'N/A'}
				</h2>
				<p className='text-sm text-bodyTextColour'>
					{user?.email || 'N/A'}
				</p>
			</div>

			{/* Account Status */}
			<div className='space-y-4 border-t pt-4'>
				<div className=' flex justify-between'>
					<h3 className='text-lg font-medium text-headerColour'>
						Account Status
					</h3>
					<p
						className={`text-sm  flex flex-col justify-center items-center ${
							user?.is_active ? 'text-green-600' : 'text-red-600'
						}`}>
						{user?.is_active ? 'Active' : 'Inactive'}
					</p>
				</div>
				<div className='flex justify-between'>
					<p className='text-sm text-bodyTextColour'>Registered: </p>
					<p className='text-sm text-headerColour'>
						{user?.created_at
							? new Date(user.created_at).toLocaleDateString()
							: 'N/A'}
					</p>
				</div>
			</div>

			{/* Additional User Information */}
			<div className='space-y-4 border-t pt-4'>
				<h3 className='text-lg font-medium text-headerColour'>
					Auction Details
				</h3>
				<div className='flex justify-between'>
					<p className='text-sm text-bodyTextColour'>
						Total Auctions Won:
					</p>
					<p className='text-sm text-headerColour'>
						{data?.total_auctions_won || '0'}
					</p>
				</div>
				<div className='flex justify-between'>
					<p className='text-sm text-bodyTextColour'>
						Total Participation:
					</p>
					<p className='text-sm text-headerColour'>
						{data?.total_participations || '0'}
					</p>
				</div>
				<div className='flex justify-between'>
					<p className='text-sm text-bodyTextColour'>
						Total Buy nows:
					</p>
					<p className='text-sm text-headerColour'>
						{data?.total_buy_now || '0'}
					</p>
				</div>
				<div className='flex justify-between'>
					<p className='text-sm text-bodyTextColour'>Total Bids:</p>
					<p className='text-sm text-headerColour'>
						{data?.total_bids || '0'}
					</p>
				</div>
			</div>

			{/* Wallet Information */}
			<div className='space-y-4 border-t pt-4'>
				<h3 className='text-lg font-medium text-headerColour'>
					Wallet Information
				</h3>
				<div className='flex justify-between'>
					<p className='text-sm text-bodyTextColour'>
						Wallet Balance:
					</p>
					<p className='text-sm text-headerColour'>
						{data?.wallet_balance || '0'}
					</p>
				</div>
				<div className='flex justify-between'>
					<p className='text-sm text-bodyTextColour'>Total Spend:</p>
					<p className='text-sm text-headerColour'>
						{data?.total_spend || '0'}
					</p>
				</div>
			</div>
		</div>
	);
};

export default UserDetails;
