/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				main: '#69C4E1',
			},
			borderWidth: {
				1: '1px',
			},
			boxShadow: {
				main: '0 6px 16px',
			},
			boxShadowColor: {
				main: 'rgba(0, 0, 0, 0.12)',
			},
			animation: {
				marquee: 'marquee 5s linear infinite',
			},
			keyframes: {
				marquee: {
					'0%': {
						transform: 'translateX(100%)',
					},
					'100%': {
						transform: 'translateX(-100%)',
					},
				},
			},
		},
	},
	plugins: [],
};
