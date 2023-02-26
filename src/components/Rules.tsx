import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function Rules(): JSX.Element {
	const [isDisplayed, setIsDisplayed]: [
		boolean,
		React.Dispatch<React.SetStateAction<boolean>>
	] = useState(false)
	return (
		<>
			<div
				className='w-fit h-fit text-white uppercase font-heavy px-8 py-1 border rounded cursor-pointer md:absolute md:bottom-[5%] md:right-[2.5%]'
				onClick={() => setIsDisplayed(!isDisplayed)}
			>
				Rules
			</div>
			<motion.div
				className='w-full h-full bg-white flex flex-col items-center gap-y-16 px-8 py-16 absolute top-0 left-0'
				initial={{ transform: 'translate(0, 100%)' }}
				animate={isDisplayed ? { transform: 'translate(0,0)' } : {}}
			>
				<div className='text-[150%] font-heavy uppercase tracking-widest'>
					Rules
				</div>
				<img src='/image-rules-bonus.svg' alt='rules' />
				<img
					className='mt-8 cursor-pointer'
					src='/close.svg'
					alt='close-rules'
					onClick={() => setIsDisplayed(!isDisplayed)}
				/>
			</motion.div>
		</>
	)
}
