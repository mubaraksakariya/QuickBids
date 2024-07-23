import React, { useEffect } from 'react';
import EmptyProfilePost from './EmptyProfilePost';
import useProfileProducts from '../../../CustomHooks/userProfileProducts';
import ProfileProductCard from './ProfileProductCard';

function ProfilePosts() {
	const { data: profileProducts, error, isLoading } = useProfileProducts();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	return (
		<>
			{profileProducts.length > 0 ? (
				<div className=' flex flex-wrap gap-4 justify-center'>
					{/*  <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-auto  gap-4 justify-center'> */}
					{profileProducts.map((product) => (
						<ProfileProductCard
							product={product}
							key={product.id}
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
