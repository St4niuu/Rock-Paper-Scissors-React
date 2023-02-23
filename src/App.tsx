import React from 'react'
import './assets/styles/global.css'
import configureStore from './store'
import { Provider } from 'react-redux'
import Score from './components/Score'

export default function App(): JSX.Element {
	const store = configureStore()

	return (
		<Provider store={store}>
			<Score />
		</Provider>
	)
}
