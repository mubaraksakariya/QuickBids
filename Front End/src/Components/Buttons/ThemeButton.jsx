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

	// Define gradient themes using Tailwind's built-in gradient utilities
	if (style === 1)
		colourTheme =
			'bg-gradient-to-r from-yellow-400 to-yellow-800 hover:from-yellow-300 hover:to-yellow-200';
	if (style === 2)
		colourTheme =
			'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500';
	if (style === 3)
		colourTheme =
			'bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300';
	if (style === 4)
		colourTheme =
			'bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300';
	if (style === 5)
		colourTheme =
			'bg-gradient-to-r from-pink-400 to-pink-300 hover:from-pink-300 hover:to-pink-200';
	if (style === 6)
		colourTheme =
			'bg-gradient-to-r from-yellow-700 to-yellow-600 hover:from-yellow-600 hover:to-yellow-500';
	if (style === 7)
		colourTheme =
			'bg-gradient-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200';
	if (style === 8)
		colourTheme =
			'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400';
	if (style === 9)
		colourTheme =
			'bg-gradient-to-r from-green-200 to-green-100 hover:from-green-100 hover:to-green-50 text-gray-700';
	if (style === 10)
		colourTheme =
			'bg-gradient-to-r from-pink-200 to-pink-100 hover:from-pink-100 hover:to-pink-50 text-gray-700';
	if (style === 11)
		colourTheme =
			'bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400';
	if (style === 12)
		colourTheme =
			'bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300';
	if (style === 13)
		colourTheme =
			'bg-gradient-to-r from-yellow-700 to-yellow-600 hover:from-yellow-600 hover:to-yellow-500';
	if (style === 14)
		colourTheme =
			'bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-400 hover:to-teal-300';
	if (style === 15)
		colourTheme =
			'bg-gradient-to-r from-red-400 to-red-300 hover:from-red-300 hover:to-red-200';
	if (style === 16)
		colourTheme =
			'bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white';
	if (style === 17)
		colourTheme =
			'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400';
	if (style === 18)
		colourTheme =
			'bg-gradient-to-r from-lime-400 to-lime-300 hover:from-lime-300 hover:to-lime-200 text-gray-700';
	if (style === 19)
		colourTheme =
			'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white';
	if (style === 20)
		colourTheme =
			'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white';
	if (style === 21)
		colourTheme =
			'bg-gradient-to-r from-red-500 to-red-400 hover:from-red-400 hover:to-red-300 text-gray-700';
	if (style === 22)
		colourTheme =
			'bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-400 hover:to-purple-300 text-white';
	if (style === 23)
		colourTheme =
			'bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300';
	if (style === 24)
		colourTheme =
			'bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-400 hover:to-teal-300 text-white';

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
