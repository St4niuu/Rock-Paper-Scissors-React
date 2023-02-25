import React from 'react'
import { connect } from 'react-redux'
import { boardItems } from '../assets/items'

function Board(): JSX.Element {
	return (
		<div className='w-full min-w-[250px] flex justify-center'>
			<div className='w-[65%] relative'>
				<img className='w-full' src='/pentagon.svg' alt='board-image' />
				{boardItems.map((element, index) => {
					return (
						<div
							key={index}
							className={`w-20 h-20 p-2 absolute translate-x-[-50%] translate-y-[-50%] rounded-[50%] ${element.name}-styling`}
							style={{
								top: element.top,
								left: element.left,
							}}
						>
							<div className='w-full h-full bg-white grid place-items-center rounded-[50%]'>
								<img
									className='w-8 h-8'
									src={`/icon-${element.name}.svg`}
									alt={`${element.name}-icon`}
								/>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default connect(undefined, undefined)(Board)
