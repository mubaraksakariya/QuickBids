import React, { useState, useEffect } from 'react';

function PriceInput({
	initialPrize,
	setInitialPrize,
	buyNowPrize,
	setBuyNowPrize,
}) {
	const [error, setError] = useState('');

	useEffect(() => {
		if (Number(buyNowPrize) <= Number(initialPrize)) {
			setError('Buy Now Prize must be greater than Initial Prize');
			setBuyNowPrize(Number(initialPrize) + 1);
		} else {
			setError('');
		}
	}, [initialPrize, buyNowPrize]);

	return (
		<div className='mx-auto  rounded-xl space-y-4 relative w-full'>
			<div>
				<label
					className='block text-sm font-medium text-gray-700'
					htmlFor='initialPrize'>
					Initial Prize
				</label>
				<input
					type='number'
					id='initialPrize'
					value={initialPrize}
					onChange={(e) => setInitialPrize(e.target.value)}
					className='mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
				/>
			</div>
			<div>
				<label
					className='block text-sm font-medium text-gray-700'
					htmlFor='buyNowPrize'>
					Buy Now Prize
				</label>
				<input
					type='number'
					id='buyNowPrize'
					value={buyNowPrize}
					onChange={(e) => setBuyNowPrize(e.target.value)}
					className='mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
				/>
			</div>
			{error && (
				<div className='text-red-500 text-sm absolute'>{error}</div>
			)}
			{/* <div>
				<p className='text-sm'>
					Initial Prize:{' '}
					<span className='font-semibold'>{initialPrize}</span>
				</p>
				<p className='text-sm'>
					Buy Now Prize:{' '}
					<span className='font-semibold'>{buyNowPrize}</span>
				</p>
			</div> */}
		</div>
	);
}

export default PriceInput;
