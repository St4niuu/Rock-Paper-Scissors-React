import React from 'react'
import './assets/styles/global.css'
import configureStore from './store'
import { Provider } from 'react-redux'
import Score from './components/Score'
import Board from './components/Board'
import Rules from './components/Rules'

export default function App(): JSX.Element {
	const store = configureStore()

	return (
		<Provider store={store}>
			<Score />
			<Board />
			<Rules />
		</Provider>
	)
}
