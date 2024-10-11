function calculateTimeLeft(time) {
	const endTime = new Date(time);
	const now = new Date(); // Current time is in UTC by default

	const difference = endTime - now;
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

function getTimeRemaining(endTime, callback) {
	const timer = setInterval(() => {
		const timeLeft = calculateTimeLeft(endTime);
		callback(timeLeft);

		if (timeLeft.isTimeOver) {
			clearInterval(timer);
		}
	}, 1000);

	return () => clearInterval(timer);
}

export { getTimeRemaining };
