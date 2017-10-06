const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets:["env"]
				}
			},
			{ //loads the fonts
				test: /\.(eot|svg|otf|woff|woff2)$/,
				loader: 'file-loader'
			},
			{
				test: /\.(jpg|png|svg)$/,
			  loader: 'url-loader',
			  options: {
			    limit: 25000,
			  }
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('style.css')
	]
};

/*
,
externals: {
	paper: 'paper',
	paper-jsdom: "paper-jsdom",
	paper-jsdom-canvas: "paper-jsdom-canvas"
},
*/
