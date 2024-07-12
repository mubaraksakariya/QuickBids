import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'selector',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				...colors, // Include all default Tailwind colors
				white: '#ffffff',
				blue: '#1fb6ff',
				purple: '#7e5bef',
				pink: '#ff49db',
				orange: '#ff7849',
				green: '#13ce66',
				yellow: '#ffc82c',
				graydark: '#273444',
				gray: '#8492a6',
				graylight: '#d3dce6',
				themeBgColour: '#fdf1ec',
				buttonColour1: '#7F265B',
				buttonColour2: '#993D7C',
				buttonColour3: '#661B4A',
				button2Colour1: '#076e05',
				button2Colour2: '#048e0b',
				button2Colour3: '#146107',
				errorColour: '#dc2626',
			},
		},
	},
	plugins: [],
};
