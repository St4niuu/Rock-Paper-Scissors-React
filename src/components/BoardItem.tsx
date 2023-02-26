import React from 'react'

export default function BoardItem({
	element,
}: {
	element: string
}): JSX.Element {
	return (
		<div className='w-full h-full bg-white grid place-items-center item-shadow rounded-[50%]'>
			<img
				className='w-10 h-10 md:w-24 md:h-24'
				src={`/icon-${element}.svg`}
				alt={`${element}-icon`}
			/>
		</div>
	)
}
