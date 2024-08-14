// ProductPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import NoneHomeNavbar from '../../Components/Navbar/NoneHomeNavbar';
import useProductById from '../../CustomHooks/useProductById';
import useAuction from '../../CustomHooks/useAuction';
import useHighestBid from '../../CustomHooks/useHighestBid';

import Footer from '../../Components/Footer/Footer';
import ProductImageSection from './Components/ProoductPage/ProductImageSection';
import ProductDetails from './Components/ProoductPage/ProductDetails';
import BidSection from './Components/ProoductPage/BidSection';
import ProxyBidSection from './Components/ProoductPage/ProxyBidSection';
import BuyNowSection from './Components/ProoductPage/BuyNowSection';
import TimeRemaining from '../../Components/Products/Components/TimeRemaining';
import AuctionStatusIndicator from '../../Components/Products/Components/AuctionStatusIndicator';

function ProductPage() {
	const [isAuctionOver, setIsAuctionOver] = useState(true);
	const { id } = useParams();
	const {
		data: product,
		error: productError,
		isLoading: productLoading,
	} = useProductById(id);
	const {
		data: auction,
		error: auctionError,
		isLoading: auctionLoading,
	} = useAuction(id);
	const {
		data: highestBid,
		error: highestBidError,
		isLoading: isHighestBidLoading,
	} = useHighestBid(id);
	const auctionEnd = () => {
		console.log('auction ended');
		setIsAuctionOver(true);
	};

	return (
		<div className='full-page'>
			<NoneHomeNavbar />
			<div className='container mx-auto lg:flex gap-8  mt-4 p-4'>
				<ProductImageSection
					images={product?.images}
					isLoading={productLoading}
				/>
				<div className='flex-1 p-6 flex flex-col rounded-lg shadow-lg relative'>
					<div className='flex flex-col flex-grow'>
						<div className=''>
							<ProductDetails
								product={product}
								auction={auction}
								auctionEnd={auctionEnd}
							/>
						</div>
						{/* badge or timer if auction exists */}
						<div className='lg:absolute right-3 top-3 flex justify-center py-2'>
							{!isAuctionOver ? (
								<TimeRemaining
									endTime={auction?.end_time}
									timerEnded={auctionEnd}
								/>
							) : (
								<AuctionStatusIndicator
									isActive={auction?.is_active}
									isTimeOver={isAuctionOver}
								/>
							)}
						</div>
						{!isAuctionOver ? (
							<>
								<div className=''>
									<BidSection
										highestBid={highestBid}
										auction={auction}
									/>
								</div>
								<div className=''>
									<ProxyBidSection />
								</div>
							</>
						) : (
							<div className=' flex-1'>
								<p className=' text-justify'>
									This acuction is not active right now,
									however you can buy this product
								</p>
							</div>
						)}
						<div className=''>
							<BuyNowSection product={product} />
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default ProductPage;
