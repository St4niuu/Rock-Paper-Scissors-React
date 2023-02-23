import { createAction, createReducer } from '@reduxjs/toolkit'

const scoreInitialState: number = 0

export const setScore = createAction('SET_SCORE')
export const resetScore = createAction('RESET_SCORE')

export const scoreReducer = createReducer(scoreInitialState, (builder) => {
	builder
		.addCase(setScore, (state) => {
			return ++state
		})
		.addCase(resetScore, (state) => {
			return scoreInitialState
		})
})

type PickReducerType = {
	user: string | null
	computer: string | null
}

const pickInitalState = {
	user: null,
	computer: null,
} as PickReducerType

export const setUserPick = createAction('SET_USER', (pick) => {
	return {
		payload: pick,
	}
})
export const setComputerPick = createAction('SET_COMPUTER', (pick) => {
	return {
		payload: pick,
	}
})
export const resetPicks = createAction('RESET_PICKS')

export const pickReducer = createReducer(pickInitalState, (builder) => {
	builder
		.addCase(setUserPick, (state, action) => {
			return { ...state, user: action.payload }
		})
		.addCase(setComputerPick, (state, action) => {
			return { ...state, computer: action.payload }
		})
		.addCase(resetPicks, (state, action) => {
			return pickInitalState
		})
})
