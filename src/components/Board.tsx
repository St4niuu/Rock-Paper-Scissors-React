import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { boardItems } from '../assets/items'
import { setUserPick } from '../reducers'
import { motion, AnimatePresence } from 'framer-motion'
import BoardItem from './BoardItem'

function Board(props: {
	user: string
	setUserPick: (pick: string) => any
}): JSX.Element {
	const [drawnItem, setDrawnItem]: [
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
				}, 5000)
			}, 1000)
		}
	}, [user])

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
								className={`w-24 h-24 p-2 absolute translate-x-[-50%] translate-y-[-50%] rounded-[50%] ${element.name}-styling`}
								style={{
									top: element.top,
									left: element.left,
								}}
								onClick={() => props.setUserPick(element.name)}
								animate={
									user
										? {
												transform: 'translate(-50%, -50%) scale(1.25)',
												top: '50%',
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
						className='w-24 h-24 bg-gray-900 absolute top-[50%] left-[100%] rounded-[50%]'
						initial={{ transform: 'translate(100%, -50%) scale(0)' }}
						animate={{ transform: 'translate(-50%, -50%) scale(1.25)' }}
						transition={{ duration: 0.5 }}
					>
						{drawnItem && (
							<motion.div
								className={`w-24 h-24 p-2 rounded-[50%] ${drawnItem}-styling`}
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
})

export default connect(
	(state: any) => ({ user: state.picks.user }),
	mapDispatchToProps
)(Board)
