import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import progress from 'rollup-plugin-progress'
import replace from 'rollup-plugin-replace'

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/main.js',
  output: {
    file: 'public/bundle.js',
    format: 'iife', // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true,
  },
  plugins: [
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
    commonjs({ include: 'node_modules/**' }), // converts date-fns to ES modules

    production && terser(), // minify, but only in production
  ],
}
