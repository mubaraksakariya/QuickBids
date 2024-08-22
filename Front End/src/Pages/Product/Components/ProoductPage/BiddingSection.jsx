import React from 'react';

import BidSection from './BidSection';
import ProxyBidSection from './ProxyBidSection';

const BiddingSection = ({
	highestBid,
	auction,
	product,
	proxyBid,
	isAuctionOver,
}) => {
	if (!isAuctionOver)
		return (
			<>
				<BidSection highestBid={highestBid} auction={auction} />
				<ProxyBidSection
					highestBid={highestBid}
					auction={auction}
					product={product}
					proxyBid={proxyBid}
				/>
			</>
		);
	else
		return (
			<div className=' flex flex-col justify-center items-center pb-4'>
				<h1 className=' font-bold text-center'>Auction is over</h1>
				<p>You can buy this product</p>
			</div>
		);
};

export default BiddingSection;
