import React, { useEffect, useState } from 'react';
import { getTimeRemaining } from './timeRemaining';

function TimeRemaining({ bidEndTime, timerEnded }) {
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});
	const [ended, setEnded] = useState(false);

	useEffect(() => {
		const clearTimer = getTimeRemaining(
			bidEndTime,
			(time) => {
				setTimeLeft(time);
				if (time.isTimeOver) {
					setEnded(true);
					timerEnded();
				}
			},
			() => {
				console.log('ended');
			}
		);

		return () => clearTimer(); // Clean up timer on unmount
	}, [bidEndTime]);

	return (
		<>
			{!ended ? (
				<div className='flex justify-between'>
					<p>Bid ends in :</p>
					<p>
						{timeLeft.days} days {timeLeft.hours}:{timeLeft.minutes}
						:{timeLeft.seconds}
					</p>
				</div>
			) : (
				<p className=' text-center w-full'>Auction has ended</p>
			)}
		</>
	);
}

export default TimeRemaining;
