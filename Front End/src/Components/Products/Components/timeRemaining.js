function calculateTimeLeft(bidEndTime) {
	const difference = new Date(bidEndTime) - new Date();
	let timeLeft = {};

	if (difference > 0) {
		timeLeft = {
			days: Math.floor(difference / (1000 * 60 * 60 * 24)),
			hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
			minutes: Math.floor((difference / 1000 / 60) % 60),
			seconds: Math.floor((difference / 1000) % 60),
			isTimeOver: false,
		};
	} else {
		timeLeft = {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			isTimeOver: true,
		};
	}

	return timeLeft;
}

function getTimeRemaining(bidEndTime, callback) {
	const timer = setInterval(() => {
		const timeLeft = calculateTimeLeft(bidEndTime);
		callback(timeLeft);

		if (timeLeft.isTimeOver) {
			clearInterval(timer);
		}
	}, 1000);

	return () => clearInterval(timer); // Return a function to clear the interval
}

export { getTimeRemaining };
