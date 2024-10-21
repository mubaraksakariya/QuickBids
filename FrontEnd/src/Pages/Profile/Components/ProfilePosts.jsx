import React, { useState } from 'react';
import EmptyProfilePost from './EmptyProfilePost';
import useProfileProducts from '../../../CustomHooks/userProfileProducts';
import ProfileProductCard from './ProfileProductCard';
import { useNavigate } from 'react-router-dom';
function ProfilePosts() {
	const navigate = useNavigate();
	const {
		data: profileProducts,
		error,
		isLoading,
		refetch,
	} = useProfileProducts();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	const handleEditAuction = (auction) => {
		navigate(`edit-auction/${auction.id}`);
		refetch();
	};

	return (
		<>
			{profileProducts.length > 0 ? (
				<div className='flex flex-wrap gap-7 justify-center py-5'>
					{profileProducts.map((product) => (
						<ProfileProductCard
							product={product}
							key={product.id}
							setAuctionEdit={handleEditAuction}
						/>
					))}
				</div>
			) : (
				<EmptyProfilePost />
			)}
		</>
	);
}

export default ProfilePosts;
