import React from 'react';
import { useParams } from 'react-router-dom';
import NoneHomeNavbar from '../../Components/Navbar/NoneHomeNavbar';
import useProductById from '../../CustomHooks/useProductById';
import ImageSlider from './Components/ImageSlider';
import useAuction from '../../CustomHooks/useAuction';
import useHighestBid from '../../CustomHooks/useHighestBid';
import ThemeButtons from '../../Components/Buttons/ThemeButton';
import TimeRemaining from '../../Components/Products/Components/TimeRemaining';

function ProductPage() {
	const { id } = useParams();
	const {
		data: product,
		error: productError,
		isLoading: productLoading,
	} = useProductById(id);
	const {
		data: auction,
		error: auctionError,
		isLoading: auctionLoading,
	} = useAuction(id);
	const {
		data: highestBid,
		error: highestBidError,
		isLoading: isHighestBidLoading,
	} = useHighestBid(id);
	const auctionEnd = () => {
		console.log('auction ended');
	};
	const imageUrls = product?.images.map((item) => item.image);

	return (
		<div className='full-page'>
			<NoneHomeNavbar />
			<div className='lg:flex gap-6 lg:m-5 m-2 relative'>
				<div className='flex-1 bg-white flex justify-center items-center shadow-lg'>
					{productLoading || !imageUrls ? (
						<p className='text-center text-lg text-gray-500'>
							Loading...
						</p>
					) : (
						<ImageSlider images={imageUrls} />
					)}
				</div>
				<div className='lg:absolute right-4 top-2 flex justify-center py-4'>
					<TimeRemaining
						endTime={auction?.end_time}
						timerEnded={auctionEnd}
					/>
				</div>
				<div className='flex-1 p-6 rounded-lg relative'>
					<h1 className='text-3xl font-bold text-headerColour mb-4'>
						{product?.title}
					</h1>
					<p className='text-base text-bodyTextColour mb-6'>
						{product?.description}
					</p>

					<p className='text-xl text-bodyTextColour mb-2'>
						Current bid:{' '}
						<span className='font-semibold text-linkColour'>
							{highestBid?.amount
								? `$${highestBid.amount}`
								: 'Be the first one to bid !!'}
						</span>
					</p>
					{/* bid now */}
					<div className='mb-6 flex gap-5'>
						<div className='flex-1'>
							<label htmlFor='bid-now' className='text-sm'>
								Your bid
							</label>
							<input
								defaultValue={
									highestBid?.amount
										? highestBid.amount
										: auction?.initial_prize
								}
								type='number'
								id='bid-now'
								placeholder='Enter your bid'
								className='border border-cardBorderColour rounded-lg py-2 px-3 w-full '
							/>
						</div>
						<div className='flex-1 flex flex-col justify-end'>
							<ThemeButtons
								text='Bid Now'
								className={'w-full h-10'}
							/>
						</div>
					</div>
					<div className='md:flex gap-5 mb-6'>
						<div className='flex-1 flex gap-5  lg:mb-0 mb-3'>
							<div className='flex-1 flex flex-col justify-end'>
								<label htmlFor='proxy-bid' className='text-sm'>
									Maximum amount
								</label>
								<input
									id='proxy-bid'
									type='number'
									placeholder='Max proxy'
									className='border border-cardBorderColour rounded-lg py-2 px-3 w-full'
								/>
							</div>
							<div className='flex-1 flex flex-col justify-end'>
								<label htmlFor='incriment' className='text-sm'>
									incriment
								</label>
								<input
									id='incriment'
									type='number'
									placeholder='Proxy incriment'
									className='border border-cardBorderColour rounded-lg py-2 px-3 w-full'
								/>
							</div>
						</div>
						<div className='flex-1 flex flex-col justify-end'>
							<ThemeButtons
								text='Proxy Bid'
								className={'w-full h-10'}
							/>
						</div>
					</div>
					<div className='md:flex gap-5'>
						<div className='flex-1  lg:mb-0 mb-3'>
							<p className='text-xl text-bodyTextColour '>
								Buy now price
							</p>
							<span className='font-semibold text-linkColour'>
								{product?.buy_now_prize}
							</span>
						</div>
						<div className='flex-1 flex flex-col justify-end'>
							<ThemeButtons
								text='Buy now'
								className={'w-full h-10'}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductPage;
