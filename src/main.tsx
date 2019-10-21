/** @jsx jsx */

import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider, ColorMode, useColorMode, jsx } from 'theme-ui'
import * as themePresets from '@theme-ui/presets'

// import './main.css'

// even though Rollup is bundling all your files together, errors and
// logs will still point to your original source modules
console.log('if you have sourcemaps enabled in your devtools, click on main.js:5 -->')

const defaultTheme = {
	fonts: {
		body: 'system-ui, sans-serif',
		heading: '"Avenir Next", sans-serif',
		monospace: 'Menlo, monospace',
	},
	colors: {
		text: '#000',
		background: '#fff',
		primary: '#07c',
		modes: {
			dark: {
				text: '#fff',
				background: '#000',
				primary: '#0cf',
			},
		},
	},
}

const ColorModeButton = () => {
	const [colorMode, setColorMode] = useColorMode()
	const handleChange = () => {
		colorMode === 'default' ? setColorMode('dark') : setColorMode('default')
	}
	return (
		<React.Fragment>
			<div sx={{ py: 4 }}>
				<input
					type="radio"
					value="default"
					checked={colorMode === 'default'}
					onChange={handleChange}
				/>{' '}
				default
				{' | '}
				<input
					type="radio"
					value="dark"
					checked={colorMode === 'dark'}
					onChange={handleChange}
				/>{' '}
				dark
			</div>
		</React.Fragment>
	)
}

const App = () => {
	const [theme, setTheme] = React.useState(defaultTheme)
	return (
		<ThemeProvider theme={theme}>
			<ColorMode />
			<div
				sx={{
					display: 'grid',
					gridGap: 4,
					gridTemplateColumns: ['auto', '1fr 256px'],
				}}
			>
				<main sx={{ maxWidth: 512, mx: 'auto', minHeight: '50vh' }}>
					<h1>heading</h1>
					<code>
						current theme: <pre>{JSON.stringify(theme, null, 2)}</pre>
					</code>
				</main>
				<aside>
					<ColorModeButton />
					<select onChange={evt => setTheme(themePresets[evt.target.value])}>
						{Object.keys(themePresets).map(themeName => (
							<option key={themeName} value={themeName}>
								{themeName}
							</option>
						))}
					</select>
				</aside>
			</div>
		</ThemeProvider>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
