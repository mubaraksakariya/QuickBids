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
		<div className='absolute inset-0 flex items-center justify-center'>
			<div
				ref={overlayRef}
				className='bg-sectionBgColour3 p-6 rounded-lg w-full max-w-lg shadow-2xl'>
				<button
					className='absolute top-2 right-2 text-headerColour bg-button3Colour rounded-full px-3 py-1'
					onClick={toggleBiddingWindow}>
					&times;
				</button>

				<div className='h-full flex flex-col justify-evenly'>
					<h5 className='mb-4 text-2xl font-bold tracking-tight text-headerColour'>
						{product.title}
					</h5>

					<CurrentBid
						isLoading={isLoading}
						highestBidError={highestBidError}
						highestBid={highestBid}
					/>

					<div className='flex justify-between pb-4 text-bodyTextColour'>
						<p>Bid ends :</p>
						<TimeRemaining
							endTime={auction.end_time}
							timerEnded={() => toggleBiddingWindow(false)}
						/>
					</div>

					<form className='flex mb-4' onSubmit={manageSubmi}>
						<div className='flex-1 relative'>
							<label
								htmlFor='number-input'
								className='block mb-2 text-sm font-medium text-bodyTextColour'>
								Update your bid:
							</label>
							<input
								onChange={() => setInputError(false)}
								name='newBIdInput'
								defaultValue={
									highestBid?.amount
										? highestBid.amount
										: auction.initial_prize
								}
								type='number'
								min={
									highestBid?.amount
										? highestBid.amount
										: auction.initial_prize
								}
								max={product.buy_now_prize}
								id='number-input'
								className='bg-white border border-cardBorderColour text-bodyTextColour text-sm rounded-lg focus:ring-button2Colour1 focus:border-button2Colour1 block w-full p-2.5'
								step='0.01'
								required
							/>
							{inputError && (
								<span className='absolute text-errorColour text-xs -left-3 -bottom-6'>
									{inputError}
								</span>
							)}

							{highestBid?.amount && !inputError && (
								<span className='absolute text-xs left-0 -bottom-6'>
									Updated {timeAgo(highestBid.created_at)}
								</span>
							)}
						</div>

						<div className='ml-4 flex flex-col justify-end'>
							<button
								type='submit'
								className={`text-white ${
									isLoading || isUpdating
										? 'bg-button2Colour2'
										: 'bg-button2Colour1 hover:bg-button2Colour2 active:bg-button2Colour3'
								} font-medium rounded-lg text-sm px-5 py-2.5`}
								disabled={isLoading || isUpdating}>
								{isLoading || isUpdating
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
