import React from 'react';

function ThemeButtons({
	text = 'Button',
	onclick = () => {},
	icon,
	className,
	type = 'button',
	style = 1,
}) {
	let colourTheme;
	if (style == 1)
		colourTheme = 'bg-[#FF6F61] hover:bg-[#FF5C4F] active:bg-[#FF483F]';
	if (style == 2)
		colourTheme = 'bg-[#FFD700] hover:bg-[#FFC700] active:bg-[#FFB700]';
	if (style == 3)
		colourTheme = 'bg-[#2F4F4F] hover:bg-[#1E3B3B] active:bg-[#0D2727]';
	if (style == 4)
		colourTheme =
			'bg-[#d8e3dc] text-[#2F4F4F] hover:bg-[#c7d8d0] active:bg-[#b7cdc4]';
	if (style == 5)
		colourTheme = 'bg-[#333333] hover:bg-[#1F1F1F] active:bg-[#0D0D0D]';
	if (style == 6)
		colourTheme =
			'bg-[#AEC6CF] text-[#2F4F4F] hover:bg-[#96B0B8] active:bg-[#7F99A1]';
	if (style == 7)
		colourTheme =
			'bg-[#F5F5DC] text-[#2F4F4F] hover:bg-[#E0E0B8] active:bg-[#CACAA4]';
	if (style == 8)
		colourTheme = 'bg-[#003366] hover:bg-[#00264D] active:bg-[#001933]';
	if (style == 9)
		colourTheme =
			'bg-[#98FF98] text-[#2F4F4F] hover:bg-[#80E680] active:bg-[#66CC66]';
	if (style == 10)
		colourTheme =
			'bg-[#FFB6C1] text-[#2F4F4F] hover:bg-[#FFA1B0] active:bg-[#FF8CA0]';
	if (style == 11)
		colourTheme =
			'bg-[#E6E6FA] text-[#2F4F4F] hover:bg-[#D4D4F0] active:bg-[#C2C2E6]';
	if (style == 12)
		colourTheme =
			'bg-[#FFDAB9] text-[#2F4F4F] hover:bg-[#FFC9A6] active:bg-[#FFB793]';
	if (style == 13)
		colourTheme = 'bg-[#808000] hover:bg-[#6B6B00] active:bg-[#555500]';
	if (style == 14)
		colourTheme = 'bg-[#20B2AA] hover:bg-[#1A9E94] active:bg-[#14897F]';
	if (style == 15)
		colourTheme =
			'bg-[#AFEEEE] text-[#2F4F4F] hover:bg-[#9DE5E5] active:bg-[#8BDDDD]';
	if (style == 16)
		colourTheme =
			'bg-[#FFA07A] text-[#2F4F4F] hover:bg-[#FF8E66] active:bg-[#FF7C52]';
	if (style == 17)
		colourTheme =
			'bg-[#EE82EE] text-[#2F4F4F] hover:bg-[#DA70D6] active:bg-[#BA55D3]';

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
