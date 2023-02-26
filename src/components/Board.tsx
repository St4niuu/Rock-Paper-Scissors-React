/* eslint-disable indent */
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { boardItems } from '../assets/items'
import { setComputerPick, setScore, setUserPick } from '../reducers'
import { motion, AnimatePresence } from 'framer-motion'
import BoardItem from './BoardItem'
import calculateScore from '../functions/calculateScore'

function Board(props: {
	user: string
	computer: string
	setUserPick: (pick: string) => any
	setComputerPick: (pick: string) => any
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
		<div className='w-full min-w-[250px] flex justify-center'>
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
									element.name
								}-styling ${user && result === 'win' ? 'winner-shadow' : ''}`}
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
												top: '25%',
												left: 0,
										  }
										: {}
								}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.5 }}
							>
								<BoardItem element={element.name} />
							</motion.div>
						)
					})}
				</AnimatePresence>
				{user && (
					<motion.div
						className='w-24 h-24 bg-gray-900 absolute top-[25%] left-[100%] rounded-[50%]'
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
								}`}
							>
								<BoardItem element={drawnItem} />
							</motion.div>
						)}
					</motion.div>
				)}
			</div>
		</div>
	)
}

const mapDispatchToProps = (dispatch: any) => ({
	setUserPick: (pick: string) => dispatch(setUserPick(pick)),
	setComputerPick: (pick: string) => dispatch(setComputerPick(pick)),
	setScore: () => dispatch(setScore()),
})

export default connect(
	(state: any) => ({ user: state.picks.user, computer: state.picks.computer }),
	mapDispatchToProps
)(Board)
