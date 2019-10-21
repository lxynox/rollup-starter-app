import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import progress from 'rollup-plugin-progress'
import replace from 'rollup-plugin-replace'
import livereload from 'rollup-plugin-livereload'
import postcss from 'rollup-plugin-postcss'
import postcssImport from 'postcss-import'
import postcssPresetEnv from 'postcss-preset-env'
import cssnano from 'cssnano'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const { ROLLUP_WATCH, USE_TS, USE_LIVE_RELOAD, USE_POSTCSS } = process.env

export default {
	input: 'src/main.tsx',
	output: {
		file: 'public/bundle.js',
		format: 'iife', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: true,
	},
	plugins: [
		json(),
		progress(),
		resolve(), // tells Rollup how to find date-fns in node_modules
		replace({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
		babel({
			exclude: 'node_modules/**',
			babelrc: false,
			presets: ['@babel/preset-env', '@babel/preset-react'],
		}),
		// converts date-fns to ES modules
		// https://github.com/reduxjs/react-redux/issues/643#issuecomment-285008041
		commonjs({
			include: 'node_modules/**',
			namedExports: {
				'node_modules/react/index.js': [
					'useContext',
					'useState',
					'useEffect',
					'useReducer',
					'createContext',
					'createElement',
					'forwardRef',
					'Component',
					'Fragment',
				],
			},
		}),

		ROLLUP_WATCH && terser(), // minify, but only in production
		USE_LIVE_RELOAD && livereload(),
		USE_TS && typescript(),
		USE_POSTCSS &&
			postcss({
				plugins: [
					postcssImport(),
					postcssPresetEnv({
						stage: 1,
					}),
					cssnano(),
				],
			}),
	],
}
