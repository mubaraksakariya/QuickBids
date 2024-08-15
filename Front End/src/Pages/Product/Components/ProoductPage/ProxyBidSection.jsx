import React, { useState } from 'react';
import ThemeButtons from '../../../../Components/Buttons/ThemeButton';
import { validateProxyAmount } from '../../Utils/ProductCreationFormValidators';

const ProxyBidSection = ({ highestBid, auction, product }) => {
	const [maxBid, setMaxBid] = useState();
	const [incriment, setIncriment] = useState();
	const [error, setError] = useState(false);

	const getIncrimentSuggestion = () => {
		const currentBid =
			highestBid && highestBid.amount
				? highestBid.amount
				: auction?.initial_prize;
		if (maxBid > currentBid) {
			return (maxBid - currentBid) / 10;
		} else return 0;
	};
	const onSubmit = () => {
		setError(null);
		const proxyValError = validateProxyAmount(
			maxBid,
			incriment,
			highestBid,
			auction,
			product
		);
		if (proxyValError) {
			setError(proxyValError);
			// showError(proxyValError.message);
			return;
		}
		console.log('okey to procede');
	};
	return (
		<div className='mb-6'>
			<p className='text-xl text-bodyTextColour mb-3'>
				We can take care of your Bid for you !!
			</p>
			<div className='flex flex-col md:flex-row gap-4'>
				<div className='flex-1'>
					<label
						htmlFor='proxy-bid'
						className='block text-sm text-gray-600 mb-2'>
						Maximum amount
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
						className='border border-cardBorderColour rounded-lg py-2 px-3 w-full'
					/>
				</div>
				<div className='flex-1'>
					<label
						htmlFor='incriment'
						className='block text-sm text-gray-600 mb-2'>
						Increment
					</label>
					<input
						onChange={(e) => setIncriment(e.target.value)}
						id='incriment'
						type='number'
						placeholder={getIncrimentSuggestion()}
						className='border border-cardBorderColour rounded-lg py-2 px-3 w-full'
					/>
				</div>
			</div>
			{error && <p className='text-red-500 mt-2'>{error.message}</p>}{' '}
			<div className='flex-1 flex flex-col justify-end'>
				<ThemeButtons
					text='Set Proxy Bid'
					className='mt-4 w-full h-9'
					onclick={onSubmit}
				/>
			</div>
		</div>
	);
};

export default ProxyBidSection;
