import React, { useState, useRef, useEffect } from 'react';
import TimeRemaining from './TimeRemaining';

function BidNowOption() {
	const [isBiddingOpen, setIsBiddingOpen] = useState(false);
	const overlayRef = useRef(null);

	const currentBid = 100;
	const buyNowValue = 200;
	const productName = 'Product Name';
	const productDiscreption =
		'Here are the biggest enterprise technology acquisitions';
	const toggleBiddingWindow = () => {
		setIsBiddingOpen(!isBiddingOpen);
	};

	const manageUpdateBid = (e) => {
		e.preventDefault();
		console.log(e.target.newBIdInput.value);
	};

	const handleClickOutside = (event) => {
		if (overlayRef.current && !overlayRef.current.contains(event.target)) {
			setIsBiddingOpen(false);
		}
	};

	useEffect(() => {
		if (isBiddingOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isBiddingOpen]);

	return (
		<div className='pb-2'>
			<section className='flex justify-between items-center'>
				<p>Current Bid : Rs{currentBid}</p>
				<button
					onClick={toggleBiddingWindow}
					type='button'
					className='text-white bg-button2Colour1 hover:bg-button2Colour2 active:bg-button2Colour3 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900'>
					Bid Now
				</button>
			</section>
			{/* overlay box for placing bid */}
			{isBiddingOpen && (
				<div className='absolute inset-0 bg-opacity-50 flex items-center justify-center border border-warmGray-400'>
					<div
						ref={overlayRef}
						className='relative bg-white p-4 rounded-lg w-full h-full'>
						{/* closing button */}
						<button
							className='absolute top-2 right-2 text-white bg-black rounded-full px-2'
							onClick={toggleBiddingWindow}>
							&times;
						</button>
						<div className='h-full flex flex-col justify-evenly'>
							<div>
								<h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
									{productName}
								</h5>
								<p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
									{productDiscreption}
								</p>
							</div>
							<div>
								<div className='flex'>
									<p>Current bid:</p>
									<p>{currentBid}</p>
								</div>
								<div>
									<TimeRemaining />
								</div>
							</div>
							<div>
								<form
									className='max-w-sm mx-auto flex'
									onSubmit={manageUpdateBid}>
									<div className='flex-1'>
										<label
											htmlFor='number-input'
											className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
											Update your amount:
										</label>
										<input
											name='newBIdInput'
											defaultValue={currentBid}
											type='number'
											min={currentBid}
											max={buyNowValue}
											id='number-input'
											aria-describedby='helper-text-explanation'
											className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
											placeholder='90210'
											required
										/>
									</div>
									<div className='flex flex-col justify-end ps-5'>
										<button
											type='submit'
											className='text-white bg-button2Colour1 hover:bg-button2Colour2 active:bg-button2Colour3 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900'>
											Update
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default BidNowOption;
