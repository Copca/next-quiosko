/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			container: {
				center: true,

				padding: {
					DEFAULT: '1rem',
					// sm: '2rem',
					// lg: '4rem'
					// xl: '5rem',
					'2xl': '6rem'
				}
			},
			animation: {
				fadeIn: 'fadeIn 1s 1',
				fadeOut: 'fadeOut 1s 1'
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 }
				},
				fadeOut: {
					'0%': { opacity: 1 },
					'100%': { opacity: 0 }
				}
			}
		}
	},
	plugins: []
};
