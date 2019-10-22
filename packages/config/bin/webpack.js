#!/usr/bin/env node

const program = require('commander')
const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('../webpack.config')

program.version('0.0.1')

program
	.command('build')
	.description('build script to create webpack bundle')
	.action(function() {
		const compiler = Webpack(webpackConfig)
		compiler.run((err, stats) => {
			if (err) {
				console.error(err)
				return
			}
			console.log(stats.toString({ colors: true }))
		})
	})

program
	.command('watch')
	.description('https://github.com/webpack/webpack-dev-server')
	.action(function() {
		const compiler = Webpack(webpackConfig)
		const devServerOptions = webpackConfig.devServer
		const server = new WebpackDevServer(compiler, devServerOptions)
		server.listen(8080, '127.0.0.1', () => {
			console.log('Starting server on http://localhost:8080')
		})
	})

program.command('*').action(function(env) {
	console.log('')
	console.log('', env)
	console.log('')
})

program.parse(process.argv)
