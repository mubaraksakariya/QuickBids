import React, { useState } from 'react';
import ThemeButtons from '../../../../Components/Buttons/ThemeButton';
import { validateProxyAmount } from '../../Utils/ProductCreationFormValidators';
import usePlaceProxyBid from '../../../../CustomHooks/usePlaceProxyBid';
import GeneralModal from '../../../../Components/Models/GeneralModal';
import useProxyBid from '../../../../CustomHooks/useProxyBid';

const ProxyBidSection = ({ highestBid, auction, product, currenUser }) => {
	const [maxBid, setMaxBid] = useState();
	const [bidStep, setBidStep] = useState();

	const [error, setError] = useState(false);
	const [isSuccess, setIscuccess] = useState(false);
	const {
		data: proxyBid,
		isLoading: proxyBidLoading,
		error: proxyBidError,
	} = useProxyBid(auction?.id, currenUser?.id);

	const {
		mutate: placeBid,
		isLoading,
		isError,
		error: placeBidError,
	} = usePlaceProxyBid();

	const getIncrimentSuggestion = () => {
		const currentBid =
			highestBid && highestBid.amount
				? highestBid.amount
				: auction?.initial_prize;
		if (Number(maxBid) > Number(currentBid)) {
			return (maxBid - currentBid) / 20;
		} else return 0;
	};

	const onSubmit = () => {
		setError(null);
		const proxyValError = validateProxyAmount(
			maxBid,
			bidStep,
			highestBid,
			auction,
			product
		);
		if (proxyValError) {
			setError(proxyValError);
			return;
		}
		placeBid(
			{
				auctionId: auction.id,
				maxBid,
				bidStep,
			},
			{
				onSuccess: () => setIscuccess(true),
				onError: () => setIscuccess(false),
			}
		);
	};

	return (
		<div className='mb-6 p-6 bg-sectionBgColour3 rounded-lg shadow-md'>
			<p className='text-xl text-headerColour font-semibold mb-4'>
				We can take care of your Bid for you !!
			</p>
			<p
				className='text-linkColour cursor-pointer mb-4'
				onClick={() => console.log(proxyBid)}>
				Know current proxy bid
			</p>
			<div className='flex flex-col md:flex-row gap-4'>
				<div className='flex-1'>
					<label
						htmlFor='proxy-bid'
						className='block text-sm text-headerColour mb-2'>
						Maximum Amount
					</label>
					<input
						onChange={(e) => setMaxBid(e.target.value)}
						min={
							(highestBid && highestBid?.amount) ||
							auction?.initial_prize
						}
						id='proxy-bid'
						type='number'
						placeholder='Max proxy'
						className='border border-cardBorderColour rounded-lg py-2 px-3 w-full text-headerColour  focus:ring-2 focus:ring-linkHoverColour'
					/>
				</div>
				<div className='flex-1'>
					<label
						htmlFor='bidStep'
						className='block text-sm text-headerColour mb-2'>
						Increment
					</label>
					<input
						onChange={(e) => setBidStep(e.target.value)}
						id='bidStep'
						type='number'
						placeholder={`suggested ${getIncrimentSuggestion()}`}
						className='border border-cardBorderColour rounded-lg py-2 px-3 w-full text-headerColour  focus:ring-2 focus:ring-linkHoverColour'
					/>
				</div>
			</div>
			{error && <p className='text-errorColour mt-2'>{error.message}</p>}
			<div className='flex-1 flex flex-col justify-end'>
				<ThemeButtons
					text={isLoading ? 'Submitting...' : 'Set Proxy Bid'}
					className='mt-4 text-white rounded-lg py-2 px-4'
					style={14}
					onclick={onSubmit}
					disabled={isLoading}
				/>
			</div>
			<GeneralModal show={isSuccess} onClose={() => setIscuccess(false)}>
				<p className='text-headerColour'>
					Your proxy bid is running now
				</p>
			</GeneralModal>
		</div>
	);
};

export default ProxyBidSection;
