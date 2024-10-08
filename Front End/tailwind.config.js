/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class', // Changed to 'class' for easier dark mode handling
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				navBg: '#2F4F4F',
				navIcon: '#d8e3dc',
				mainBgColour: '#F5F5F5',
				sectionBgColour1: '#F5F5DC', // Beige
				sectionBgColour2: '#D8E3DC', // Sage Green
				sectionBgColour3: '#E8F0F2', // Light Blue
				sectionBgColour4: '#FFFAF0', // Floral White
				sectionBgColour5: '#FFF5EE', // Seashell
				sectionBgColour6: '#F0FFF0', // Honeydew
				sectionBgColour7: '#F5F5F5', // White Smoke
				sectionBgColour8: '#FAFAD2', // Light Goldenrod Yellow
				sectionBgColour9: '#E6E6FA', // Lavender
				sectionBgColour10: '#FFF0F5', // Lavender Blush

				headerColour: '#333333',
				bodyTextColour: '#333333',
				linkColour: '#2F4F4F',
				linkHoverColour: '#FF6F61',

				cardBgColour: '#d8e3dc',
				cardBorderColour: '#333333',
				cardTextColour: '#333333',

				buttonColour1: '#7F265B', // Deep Pinkish Red
				buttonColour2: '#A54C82', // Lighter Pinkish Red
				buttonColour3: '#590B3C', // Darker Maroon

				button2Colour1: '#076e05', // Dark Green
				button2Colour2: '#29A32C', // Lime Green
				button2Colour3: '#004400',

				notificationRing: '#32CD32',

				errorColour: '#dc2626',
			},
		},
	},
	plugins: [],
};
