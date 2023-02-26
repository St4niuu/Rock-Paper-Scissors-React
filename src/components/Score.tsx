import React from 'react'
import { StoreType } from '../store'
import { connect } from 'react-redux'

function Score(props: { score: number }): JSX.Element {
	return (
		<div className='w-full min-w-[300px] max-w-[750px] h-32 flex justify-between items-center border-4 border-gray-500 rounded-2xl md:h-40'>
			<img
				className='h-full p-7 md:p-4'
				src='/logo-bonus.svg'
				alt='website-logo'
			/>
			<div className='w-1/3 max-w-[180px] h-[80%] bg-white flex flex-col items-center p-2 m-4 rounded-lg'>
				<span className='text-[85%] text-scoreText font-heavy uppercase tracking-widest'>
					Score
				</span>
				<span className='text-[250%] font-heavy md:text-[350%]'>
					{props.score}
				</span>
			</div>
		</div>
	)
}

const mapStateToProps = (state: StoreType) => ({ score: state.score })

export default connect(mapStateToProps)(Score)
