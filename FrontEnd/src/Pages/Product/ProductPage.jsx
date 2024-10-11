import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NoneHomeNavbar from '../../Components/Navbar/NoneHomeNavbar';
import useProductById from '../../CustomHooks/useProductById';
import useAuction from '../../CustomHooks/useAuction';
import useHighestBid from '../../CustomHooks/useHighestBid';

import Footer from '../../Components/Footer/Footer';
import ProductImageSection from './Components/ProoductPage/ProductImageSection';
import ProductDetails from './Components/ProoductPage/ProductDetails';
import BuyNowSection from './Components/ProoductPage/BuyNowSection';
import useProductWebSocket from '../../CustomHooks/useProductWebSocket';
import LoadingSpinner from './Components/ProoductPage/LoadingSpinner';
import ProductStatus from './Components/ProoductPage/ProductStatus';
import BiddingSection from './Components/ProoductPage/BiddingSection';
import PageNotFound from '../../Components/Models/PageNotFound';
import useProxyBid from '../../CustomHooks/useProxyBid';
import { useSelector } from 'react-redux';
import { ProductLiveChat } from './Components/ProoductPage/Chat/ProductLiveChat';

function ProductPage() {
	const { id } = useParams();
	const [highestBid, setHighestBid] = useState(null);
	const [proxyBid, setProxybid] = useState(null);
	const currenUser = useSelector((state) => state.auth.user);
	const [isAuctionOver, setIsAuctionOver] = useState(false);

	const {
		data: product,
		error: productError,
		isLoading: productLoading,
	} = useProductById(id);
	const {
		data: auction,
		error: auctionError,
		isLoading: auctionLoading,
	} = useAuction(product?.id);
	const {
		data: recentBid,
		error: recentBidError,
		isLoading: recentBidLoading,
		refetch: refetchHighestBid,
	} = useHighestBid(auction?.id);
	const {
		data: proxyBidData,
		isLoading: proxyBidLoading,
		error: proxyBidError,
		refetch: refetchProxyBid,
	} = useProxyBid(auction?.id, currenUser?.id);

	const refetchData = (refetchItem) => {
		if (refetchItem === 'bid_update') refetchHighestBid();
		if (refetchItem === 'proxy_bid_update') refetchProxyBid();
	};
	useEffect(() => {
		if (recentBid) setHighestBid(recentBid);
		if (proxyBidData) setProxybid(proxyBidData);
	}, [recentBid, proxyBidData]);
	const isLoading =
		productLoading || auctionLoading || recentBidLoading || proxyBidLoading;

	// WebSocket connection
	useProductWebSocket(auction?.id, setHighestBid, setProxybid, refetchData);

	return (
		<div className='full-page relative'>
			<NoneHomeNavbar />
			{isLoading ? (
				<LoadingSpinner />
			) : productError ? (
				<PageNotFound />
			) : (
				<div className='container mx-auto lg:flex gap-8 mt-4 p-4'>
					{/* live chat */}
					<ProductLiveChat auction={auction} />
					<ProductImageSection
						images={product?.images}
						isLoading={productLoading}
					/>
					<div className='flex-1 p-6 flex flex-col relative'>
						<ProductDetails product={product} auction={auction} />
						<ProductStatus
							auction={auction}
							setIsAuctionOver={setIsAuctionOver}
							isAuctionOver={isAuctionOver}
						/>

						<BiddingSection
							highestBid={highestBid}
							auction={auction}
							product={product}
							proxyBid={proxyBid}
							isAuctionOver={isAuctionOver}
						/>

						<BuyNowSection
							product={product}
							auction={auction}
							highestBid={highestBid}
						/>
					</div>
				</div>
			)}
			<Footer />
		</div>
	);
}

export default ProductPage;
