#!/usr/bin/env node

const { spawn } = require('child_process')
const resolve = (...path) => require('path').resolve(__dirname, ...path)
const program = require('commander')

program.version('0.0.1')

program
	.command('build')
	.description('build script to create rollup bundle')
	.option('-T, --typescript', 'enable typescript')
	.option('-S, --postcss', 'enable postcss')
	.action(function(options) {
		const env = { ...process.env }
		if (options.typescript) env.USE_TS = true
		if (options.postcss) env.USE_POSTCSS = true
		spawn('rollup', ['-c', resolve('../rollup.config.js')], { env })
	})

program
	.command('watch')
	.description('watch server that live updates bundle')
	.option('-T, --typescript', 'enable typescript')
	.option('-R, --live-reload', 'enable live reload for css/js')
	.option('-S, --postcss', 'enable postcss')
	.action(function(options) {
		const env = { ...process.env }
		if (options.typescript) env.USE_TS = true
		if (options.liveReload) env.USE_LIVE_RELOAD = true
		if (options.postcss) env.USE_POSTCSS = true
		spawn('rollup', ['-c', resolve('../rollup.config.js'), '-w'], { env, stdio: 'inherit' })
	})

program.command('*').action(function(env) {
	console.log('')
	console.log('', env)
	console.log('')
})

program.parse(process.argv)
