import React from 'react';

function BigButton({ text = 'Button', onclick, icon, className }) {
	return (
		<button
			className={`md:border md:order-1 rounded-lg md:w-[15rem]  p-2 md:hover:border-button2Colour2 md:active:bg-button2Colour3 md:active:text-white ${className}`}
			onClick={() => onclick()}>
			<span className='flex justify-center gap-1'>
				{icon}
				{text}
			</span>
		</button>
	);
}

export default BigButton;
