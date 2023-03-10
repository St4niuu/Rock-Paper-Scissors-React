/* eslint-disable indent */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { boardItems } from '../assets/items'
import { resetPicks, setComputerPick, setScore, setUserPick } from '../reducers'
import { motion, AnimatePresence } from 'framer-motion'
import BoardItem from './BoardItem'
import calculateScore from '../functions/calculateScore'

function Board(props: {
	user: string
	computer: string
	setUserPick: (pick: string) => any
	setComputerPick: (pick: string) => any
	resetPicks: () => any
	setScore: () => any
}): JSX.Element {
	const [drawnItem, setDrawnItem]: [
		string,
		React.Dispatch<React.SetStateAction<string>>
	] = useState('')
	const [isDrawn, setIsDrawn]: [
		boolean,
		React.Dispatch<React.SetStateAction<boolean>>
	] = useState(false)
	const [result, setResult]: [
		string,
		React.Dispatch<React.SetStateAction<string>>
	] = useState('')

	const { user } = props

	const items = user
		? boardItems.filter((element) => element.name === props.user)
		: boardItems

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				const drawItem = setInterval(() => {
					setDrawnItem(
						boardItems.map((element) => element.name)[
							Math.floor(Math.random() * 5)
						]
					)
				}, 200)
				setTimeout(() => {
					clearInterval(drawItem)
					setIsDrawn(true)
				}, 5000)
			}, 1000)
		}
	}, [user])

	useEffect(() => {
		if (isDrawn) {
			props.setComputerPick(drawnItem)
		}
	}, [isDrawn])

	useEffect(() => {
		if (props.computer) {
			setResult(calculateScore(props.user, props.computer))
		}
	}, [props.computer])

	useEffect(() => {
		if (result === 'win') {
			props.setScore()
		}
	}, [result])

	return (
		<div className='w-full min-w-[250px] flex justify-center md:min-w-[500px] md:max-w-[700px]'>
			<div className='w-[65%] relative'>
				<img
					className={`w-full ${user ? 'invisible' : ''}`}
					src='/pentagon.svg'
					alt='board-image'
				/>
				<AnimatePresence>
					{items.map((element) => {
						return (
							<motion.div
								key={element.name}
								className={`w-24 h-24 p-2 absolute translate-x-[-50%] translate-y-[-50%] rounded-[50%] transition-shadow duration-1000 delay-500 ${
									!user ? 'cursor-pointer' : ''
								} md:w-44 md:h-44 md:p-4 ${element.name}-styling ${
									user && result === 'win' ? 'winner-shadow' : ''
								}`}
								style={{
									top: element.top,
									left: element.left,
								}}
								onClick={() => props.setUserPick(element.name)}
								animate={
									user
										? {
												transform: `translate(-50%, -50%) ${(() => {
													switch (result) {
														case 'win':
															return 'scale(1.35)'
														case 'loss':
															return 'scale(1.15)'
														default:
															return 'scale(1.25)'
													}
												})()}`,
												top: `${
													matchMedia('(min-width: 620px)').matches
														? '35%'
														: '5%'
												}`,
												left: 0,
										  }
										: {}
								}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.5 }}
							>
								<BoardItem element={element.name} />
								{user && (
									<motion.div
										className='w-full h-fit text-white text-center uppercase font-heavy absolute top-[125%] left-[50%] translate-x-[-50%] md:top-[-35%]'
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 1 }}
									>
										You picked
									</motion.div>
								)}
							</motion.div>
						)
					})}
				</AnimatePresence>
				{user && (
					<motion.div
						className='w-24 h-24 bg-gray-900 absolute top-[5%] left-[100%] rounded-[50%] md:w-44 md:h-44 md:top-[35%]'
						initial={{ transform: 'translate(100%, -50%) scale(0)' }}
						animate={{
							transform: `translate(-50%, -50%) ${(() => {
								switch (result) {
									case 'loss':
										return 'scale(1.35)'
									case 'win':
										return 'scale(1.15)'
									default:
										return 'scale(1.25)'
								}
							})()}`,
						}}
						transition={{ duration: 0.5 }}
					>
						{drawnItem && (
							<motion.div
								className={`w-24 h-24 p-2 rounded-[50%] transition-shadow duration-1000 delay-500 ${drawnItem}-styling ${
									result === 'loss' ? 'winner-shadow' : ''
								} md:w-full h-full md:p-4`}
							>
								<BoardItem element={drawnItem} />
								{user && (
									<motion.div
										className='w-[150%] h-fit text-white text-center uppercase font-heavy absolute top-[125%] left-[50%] translate-x-[-50%] md:top-[-35%]'
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.5 }}
									>
										The house picked
									</motion.div>
								)}
							</motion.div>
						)}
					</motion.div>
				)}
				{result && (
					<motion.div
						className='w-full h-fit text-white text-[200%] text-center uppercase font-heavy flex flex-col items-center gap-y-2 absolute top-[85%]'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1 }}
					>
						<div>
							{(() => {
								switch (result) {
									case 'win':
										return 'You win'
									case 'loss':
										return 'You lose'
									default:
										return 'Draw'
								}
							})()}
						</div>
						<div
							className='text-backgroundFrom bg-white text-[50%] px-16 py-4 rounded cursor-pointer md:w-[50%]'
							onClick={() => {
								setDrawnItem('')
								setIsDrawn(false)
								setResult('')
								props.resetPicks()
							}}
						>
							Play again
						</div>
					</motion.div>
				)}
			</div>
		</div>
	)
}

const mapDispatchToProps = (dispatch: any) => ({
	setUserPick: (pick: string) => dispatch(setUserPick(pick)),
	setComputerPick: (pick: string) => dispatch(setComputerPick(pick)),
	resetPicks: () => dispatch(resetPicks()),
	setScore: () => dispatch(setScore()),
})

export default connect(
	(state: any) => ({ user: state.picks.user, computer: state.picks.computer }),
	mapDispatchToProps
)(Board)
