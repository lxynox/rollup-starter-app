import React from 'react'
import { render } from 'react-dom'

import testImage from './test-image.jpg'
import './main.css'

const App = () => (
	<div className="app">
		<section className="main">
			<h1>Single image site</h1>
			<figure>
				<img src={testImage} alt="Elephant at sunset" />
				<figcaption>An elephant at sunset</figcaption>
			</figure>
		</section>
	</div>
)

render(<App />, document.getElementById('app'))
