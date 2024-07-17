import React, { useState } from 'react';
import BidNowOption from './HelperComponents/BidNowOption';
import BuyNowOption from './HelperComponents/BuyNowOption';
import TimeRemaining from './HelperComponents/TimeRemaining';

function Card({ product }) {
	const [isTimeOver, setIsTimeOver] = useState(false);
	const manageTimeover = () => {
		setIsTimeOver(true);
	};
	const manageProductOpen = (e) => {
		e.preventDefault();
		console.log('product open');
	};
	return (
		<div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col'>
			<div
				className='w-full aspect-video overflow-hidden cursor-pointer'
				onClick={manageProductOpen}>
				<img
					className='rounded-t-lg w-full h-full object-cover'
					src={product.images[0].image}
					alt='Card Image'
				/>
			</div>

			<div className='px-5 relative'>
				<div className='border-b mb-2'>
					<a className=' cursor-pointer' onClick={manageProductOpen}>
						<h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
							{product.title}
						</h5>
					</a>
					<p
						className='mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3'
						title={product.description}>
						{product.description}
					</p>
				</div>
				<div>
					<div className='flex justify-between pb-2'>
						<p>Starting Bid:</p>
						<p>{product.initial_prize}</p>
					</div>
					<TimeRemaining
						bidEndTime={product.end_date}
						timerEnded={manageTimeover}
					/>
				</div>
				<div className='pt-4'>
					{!isTimeOver && (
						<BidNowOption product={product} isTimerActive={false} />
					)}
					<BuyNowOption product={product} />
				</div>
			</div>
		</div>
	);
}

export default Card;
