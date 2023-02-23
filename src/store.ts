import { configureStore } from '@reduxjs/toolkit'
import { pickReducer, scoreReducer, PickStateType } from './reducers.js'

export type StoreType = {
	score: number
	picks: PickStateType
}

export default () =>
	configureStore({
		reducer: { score: scoreReducer, picks: pickReducer },
	})
