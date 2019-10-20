import React from 'react'
import ReactDOM from 'react-dom'

import './main.css'

// even though Rollup is bundling all your files together, errors and
// logs will still point to your original source modules
console.log('if you have sourcemaps enabled in your devtools, click on main.js:5 -->')

const App = () => <div>hello world</div>

ReactDOM.render(<App />, document.getElementById('root'))
