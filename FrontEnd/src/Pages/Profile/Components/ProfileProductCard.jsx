import React, { useState } from 'react';
import TimeRemaining from '../../../Components/Products/Components/TimeRemaining';
import useAuction from '../../../CustomHooks/useAuction';
import useHighestBid from '../../../CustomHooks/useHighestBid';
import Options from './Card/Options';
import { useNavigate } from 'react-router-dom';
import ProductImage from './Card/ProductImage';
import ProductInfo from './Card/ProductInfo';
import AuctionDetails from './Card/AuctionDetails';

const ProfileProductCard = ({ product, setAuctionEdit }) => {
	const [showOptions, setShowOptions] = useState(false);
	const navigate = useNavigate();
	const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

	const { data: auction } = useAuction(product?.id);
	const { data: highestBidData } = useHighestBid(auction?.id);

	const manageProductOpen = (e) => {
		e.preventDefault();
		navigate(`/product/${product.id}`);
	};

	return (
		<div
			className='card bg-sectionBgColour5 border-cardBorderColour rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 flex flex-col max-w-[22rem] p-4 relative transition duration-200 ease-in-out hover:shadow-xl'
			onMouseEnter={() => setShowOptions(true)}
			onMouseLeave={() => setShowOptions(false)}
			onTouchMove={() => setShowOptions(true)}>
			{showOptions && <Options onEdit={() => setAuctionEdit(auction)} />}

			<ProductImage
				product={product}
				baseUrl={baseUrl}
				onClick={manageProductOpen}
			/>

			<div className='px-2 relative mt-4'>
				<ProductInfo product={product} onClick={manageProductOpen} />
				<AuctionDetails
					auction={auction}
					highestBidData={highestBidData}
				/>
				<div className='mt-4 flex justify-center'>
					<TimeRemaining
						endTime={auction?.end_time}
						timerEnded={() => {}}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProfileProductCard;
