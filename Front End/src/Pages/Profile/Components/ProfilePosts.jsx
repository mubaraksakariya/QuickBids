import React, { useState } from 'react';
import EmptyProfilePost from './EmptyProfilePost';
import useProfileProducts from '../../../CustomHooks/userProfileProducts';
import ProfileProductCard from './ProfileProductCard';
import EditUserAuction from './Auction/EditUserAuction';

function ProfilePosts() {
	const [auctionEdit, setAuctionEdit] = useState({
		state: false,
		acuction: null,
	});
	const {
		data: profileProducts,
		error,
		isLoading,
		refetch,
	} = useProfileProducts();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	// if editing aution
	if (auctionEdit.state)
		return (
			<EditUserAuction
				auctionId={auctionEdit.acuction.id}
				onClose={() => {
					setAuctionEdit({ state: false, acuction: null });
					refetch();
				}}
			/>
		);
	return (
		<>
			{profileProducts.length > 0 ? (
				<div className='flex flex-wrap gap-4 justify-center py-5'>
					{profileProducts.map((product) => (
						<ProfileProductCard
							product={product}
							key={product.id}
							setAuctionEdit={setAuctionEdit}
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
