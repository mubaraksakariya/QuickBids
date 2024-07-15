import React, { useState } from 'react';

function PriceInput({
	initialPrize,
	setInitialPrize,
	buyNowPrize,
	setBuyNowPrize,
}) {
	const [error, setError] = useState('');
	const [internalInitialPrize, setInternalInitialPrize] = useState(0);
	const [internalBuyNowPrize, setInternalBuyNowPrize] = useState(0);

	const manageDates = () => {
		setBuyNowPrize(internalBuyNowPrize);
		setInitialPrize(internalInitialPrize);
	};

	const validatePrices = () => {
		if (Number(internalBuyNowPrize) <= Number(internalInitialPrize)) {
			setError('Initial prize should  be greater than buy now prize !!');
			// setInternalBuyNowPrize(Number(internalInitialPrize) + 1);
		} else {
			setError('');
		}
	};

	return (
		<div
			className='mx-auto rounded-xl space-y-4 relative w-full'
			onBlur={manageDates}>
			<div>
				<label
					className='block text-sm font-medium text-gray-700'
					htmlFor='buyNowPrize'>
					Buy Now Prize
				</label>
				<input
					type='number'
					id='buyNowPrize'
					value={internalBuyNowPrize}
					onChange={(e) => setInternalBuyNowPrize(e.target.value)}
					onBlur={validatePrices}
					className='mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
				/>
			</div>
			<div>
				<label
					className='block text-sm font-medium text-gray-700'
					htmlFor='initialPrize'>
					Initial Prize
				</label>
				<input
					type='number'
					id='initialPrize'
					value={internalInitialPrize}
					onChange={(e) => setInternalInitialPrize(e.target.value)}
					onBlur={validatePrices}
					className='mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
				/>
			</div>

			{error && (
				<div className='text-red-500 text-sm absolute'>{error}</div>
			)}
		</div>
	);
}

export default PriceInput;
