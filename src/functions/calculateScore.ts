import { boardItems } from '../assets/items'

export default function calculateScore(user: string, computer: string): string {
	const userPick = boardItems.filter((element) => element.name === user)[0]

	let result = 'draw'

	userPick.beats.forEach((element) => {
		if (element === computer) {
			result = 'win'
		}
	})
	userPick.getsBeaten.forEach((element) => {
		if (element === computer) {
			result = 'loss'
		}
	})

	return result
}
