import React from 'react';

function ThemeButtons({
	text = 'Button',
	onclick,
	icon,
	className,
	type = 'button',
	style = 1,
}) {
	let colourTheme;
	if (style == 1)
		colourTheme =
			'bg-button2Colour1 hover:bg-button2Colour2 active:bg-button2Colour3';
	if (style == 2)
		colourTheme =
			'bg-buttonColour1 hover:bg-buttonColour2 active:bg-buttonColour3';
	if (style == 3)
		colourTheme =
			'bg-button3Colour1 hover:bg-button3Colour2 active:bg-button3Colour3';
	if (style == 4)
		colourTheme =
			'bg-button4Colour1 hover:bg-button4Colour2 active:bg-button4Colour3';
	if (style == 5) {
		colourTheme =
			'bg-button4=5Colour1 hover:bg-button5Colour2 active:bg-button5Colour3';
	}
	if (style == 6) {
		colourTheme =
			'bg-button6Colour1 hover:bg-button6Colour2 active:bg-button6Colour3';
	}
	if (style === 7) {
		colourTheme =
			'bg-button7Colour1 hover:bg-button7Colour2 active:bg-button7Colour3';
	}

	return (
		<button
			type={type}
			className={`rounded-lg p-1 text-white ${className} ${colourTheme}`}
			onClick={() => onclick()}>
			<span className='flex justify-center gap-1'>
				{icon && icon}
				{text}
			</span>
		</button>
	);
}

export default ThemeButtons;
