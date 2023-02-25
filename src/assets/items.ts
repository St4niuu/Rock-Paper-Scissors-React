export const boardItems: {
	name: string
	left: string | number
	top: string | number
	beats: string[]
	getsBeaten: string[]
}[] = [
	{
		name: 'scissors',
		left: '50%',
		top: 0,
		beats: ['paper', 'lizard'],
		getsBeaten: ['spock', 'rock'],
	},
	{
		name: 'paper',
		left: '100%',
		top: '40%',
		beats: ['rock', 'spock'],
		getsBeaten: ['scissors', 'lizard'],
	},
	{
		name: 'rock',
		left: '80%',
		top: '100%',
		beats: ['lizard', 'scissors'],
		getsBeaten: ['paper', 'spock'],
	},
	{
		name: 'lizard',
		left: '20%',
		top: '100%',
		beats: ['spock', 'paper'],
		getsBeaten: ['rock', 'scissors'],
	},
	{
		name: 'spock',
		left: 0,
		top: '40%',
		beats: ['scissors', 'rock'],
		getsBeaten: ['lizard', 'paper'],
	},
]
