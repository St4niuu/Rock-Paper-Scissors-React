import { configureStore } from '@reduxjs/toolkit'
import { pickReducer, scoreReducer } from './reducers.js'

export default () =>
	configureStore({
		reducer: { score: scoreReducer, picks: pickReducer },
	})
