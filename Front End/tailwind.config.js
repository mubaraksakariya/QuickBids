import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'selector',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				...colors, // Include all default Tailwind colors
				themeBgNav: '#000000',
				themeBgColour: '#fdf1ec',

				buttonColour1: '#7F265B', // Deep Pinkish Red (original)
				buttonColour2: '#A54C82', // Lighter Pinkish Red (analogous)
				buttonColour3: '#590B3C', // Darker Maroon (analogous)

				button2Colour1: '#076e05', // Dark Green (original)
				button2Colour2: '#29A32C', // Lime Green (analogous)
				button2Colour3: '#004400',

				button3Colour1: '#002F34',
				button3Colour2: '#00445E',
				button3Colour3: '#00738A',

				button4Colour1: '#f5f3f4', // Theme Color (Default State)
				button4Colour2: '#e0d6d9',
				button4Colour3: '#d6c9ce',

				button5Colour1: '#f5f3f4', // Theme Color (Light Grey, Default State)
				button5Colour2: '#e0e0e0',
				button5Colour3: '#cccccc',

				button6Colour1: '#d9d9d9', // Theme Color (Darker Grey, Default State)
				button6Colour2: '#b3b3b3', // Hover State (Even Darker Grey)
				button6Colour3: '#808080', // Active/Pressed State (Very Dark Grey)

				button7Colour1: '#9c9688', // Theme Color (Base Color)
				button7Colour2: '#d2cfc2', // Hover State (Lighter Beige)
				button7Colour3: '#77706b', // Active/Pressed State (Darker Brown)

				errorColour: '#dc2626',
			},
		},
	},
	plugins: [],
};
