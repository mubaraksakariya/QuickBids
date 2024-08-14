import { useEffect, useRef, useState } from 'react';
import CurrentBid from './CurrentBid';
import TimeRemaining from './TimeRemaining';
import timeAgo from '../../Utilities/timeAgo';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BiddingOverlay = ({
	product,
	auction,
	highestBid,
	isLoading,
	isUpdating,
	highestBidError,
	toggleBiddingWindow,
	handleUpdateBid,
}) => {
	const overlayRef = useRef(null);
	const [inputError, setInputError] = useState();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const navigate = useNavigate();
	const manageSubmi = (e) => {
		e.preventDefault();
		if (!isAuthenticated) navigate('/login/');
		const newBidAmount = e.target.newBIdInput.value;
		if (highestBid && Number(newBidAmount) <= Number(highestBid.amount)) {
			console.log('New bid must be higher than the current highest bid.');
			setInputError(
				'New bid must be higher than the current highest bid.'
			);
			return;
		}
		handleUpdateBid(newBidAmount);
	};
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				overlayRef.current &&
				!overlayRef.current.contains(event.target)
			) {
				toggleBiddingWindow();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [toggleBiddingWindow]);

	return (
		<div className='absolute inset-0 bg-opacity-50 flex items-center justify-center border border-warmGray-400'>
			<div
				ref={overlayRef}
				className='card-overlay relative bg-white p-4 rounded-lg w-full h-full'>
				<button
					className='absolute top-2 right-2 text-white bg-black rounded-full px-2'
					onClick={toggleBiddingWindow}>
					&times;
				</button>
				<div className='h-full flex flex-col justify-evenly'>
					<div>
						<h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
							{product.title}
						</h5>
						<p className='mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3'>
							{product.description}
						</p>
					</div>
					<CurrentBid
						isLoading={isLoading}
						highestBidError={highestBidError}
						highestBid={highestBid}
					/>
					<div className='flex justify-between pb-4'>
						<p>Bid ends :</p>
						<TimeRemaining
							endTime={auction.end_time}
							timerEnded={() => toggleBiddingWindow(false)}
						/>
					</div>
					<form className='max-w-sm flex mb-2' onSubmit={manageSubmi}>
						<div className='flex-1 relative'>
							<label
								htmlFor='number-input'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
								Update your amount:
							</label>
							<input
								onChange={() => setInputError(false)}
								name='newBIdInput'
								defaultValue={
									highestBid.amount
										? highestBid.amount
										: auction.initial_prize
								}
								type='number'
								min={
									highestBid.amount
										? highestBid.amount
										: auction.initial_prize
								}
								max={product.buy_now_prize}
								id='number-input'
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								step='0.01'
								required
							/>
							{inputError && (
								<span className='absolute text-center text-errorColour text-xs text-nowrap -left-3 -bottom-6'>
									{inputError}
								</span>
							)}

							{highestBid?.amount && !inputError && (
								<span className='absolute text-xs text-nowrap left-0 -bottom-6'>
									Updated
									{timeAgo(highestBid.created_at)}
								</span>
							)}
						</div>
						<div className='flex flex-col justify-end ps-5'>
							<button
								type='submit'
								className={`text-white ${
									isLoading | isUpdating
										? 'bg-button2Colour2'
										: 'bg-button2Colour1 active:bg-button2Colour3'
								} hover:bg-button2Colour2 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900`}
								disabled={isLoading | isUpdating}>
								{isLoading | isUpdating
									? 'Please wait'
									: 'Update'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default BiddingOverlay;
