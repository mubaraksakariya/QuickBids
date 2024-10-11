import React from 'react';

function BigButton({ text = 'Button', onclick, icon, className }) {
	return (
		<button
			className={`big-button md:order-1${className}`}
			onClick={() => onclick()}>
			<span className='flex justify-center gap-1'>
				{icon}
				{text}
			</span>
		</button>
	);
}

export default BigButton;
