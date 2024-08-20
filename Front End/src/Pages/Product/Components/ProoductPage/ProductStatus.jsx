import React, { useState } from 'react';
import TimeRemaining from '../../../../Components/Products/Components/TimeRemaining';
import AuctionStatusIndicator from '../../../../Components/Products/Components/AuctionStatusIndicator';

const ProductStatus = ({ auction, productError }) => {
	const [isAuctionOver, setIsAuctionOver] = useState(false);

	const auctionEnd = () => {
		setIsAuctionOver(true);
	};

	return (
		<div className='lg:absolute right-3 top-0 flex justify-center py-2'>
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
	);
};

export default ProductStatus;
