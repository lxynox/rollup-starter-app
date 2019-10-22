const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const baseConfig = {
	output: {
		// library: '',
		// libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
				},
			},
		],
	},
}

if (process.env.NODE_ENV === 'production') {
	module.exports = withProd(baseConfig)
} else {
	module.exports = withDev(baseConfig)
}

// Build environment modifiers

function withDev(config) {
	return Object.assign({}, config, {
		mode: 'development',
		devtool: 'cheap-module-eval-source-map',
		devServer: {
			open: true,
			stats: {
				colors: true,
			},
			historyApiFallback: true,
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': { NODE_ENV: JSON.stringify('development') },
			}),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: 'src/template.html',
			}),
		],
	})
}

function withProd(config) {
	return Object.assign({}, config, {
		mode: 'production',
		output: Object.assign({}, config.output, {
			filename: '[name].[chunkhash].js',
			chunkFilename: '[name].[chunkhash].js',
		}),
		plugins: [
			new webpack.DefinePlugin({
				'process.env': { NODE_ENV: JSON.stringify('production') },
			}),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: 'src/template.html',
				minify: {
					removeComments: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
				},
			}),
			new CompressionPlugin(),
		],
	})
}
