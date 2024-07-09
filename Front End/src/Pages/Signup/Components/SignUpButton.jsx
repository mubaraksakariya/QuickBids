import React, { useEffect, useState } from 'react';

function SignUpButton({ onClick, isBtnLoading, text = 'Sign Up' }) {
	const [showLoading, setShowLoading] = useState(false);
	useEffect(() => {
		isBtnLoading ? setShowLoading(true) : setShowLoading(false);
	}, [isBtnLoading]);

	return (
		<button
			onClick={() => onClick()}
			type='button'
			disabled={showLoading}
			className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${
				showLoading
					? ' bg-buttonColour2'
					: 'hover:bg-buttonColour2 active:bg-buttonColour3 bg-buttonColour1 '
			}  `}>
			{showLoading ? 'Please wait' : text}
		</button>
	);
}

export default SignUpButton;
