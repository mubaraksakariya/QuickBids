import React from 'react';

import BidSection from './BidSection';
import ProxyBidSection from './ProxyBidSection';

const BiddingSection = ({ highestBid, auction, product, proxyBid }) => {
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
};

export default BiddingSection;
