/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {
				scissorsFrom: 'hsl(39, 89%, 49%)',
				scissorsTo: 'hsl(40, 84%, 53%)',
				paperFrom: 'hsl(230, 89%, 62%)',
				paperTo: 'hsl(230, 89%, 65%)',
				rockFrom: 'hsl(349, 71%, 52%)',
				rockTo: 'hsl(349, 70%, 56%)',
				lizardFrom: 'hsl(261, 73%, 60%)',
				lizardTo: 'hsl(261, 72%, 63%)',
				cyanFrom: 'hsl(189, 59%, 53%)',
				cyanTo: 'hsl(189, 58%, 57%)',
				darkText: 'hsl(229, 25%, 31%)',
				scoreText: 'hsl(229, 64%, 46%)',
				headerOutline: 'hsl(217, 16%, 45%)',
				backgroundFrom: 'hsl(214, 47%, 23%)',
				backgroundTo: 'hsl(237, 49%, 15%)',
			},
		},
		fontWeight: {
			light: 600,
			heavy: 700,
		},
		fontFamily: {
			barlow: ['Barlow Semi Condensed', 'sans-serif'],
		},
		screen: {
			md: '620px',
			lg: '968px',
		},
	},
	plugins: [],
}
