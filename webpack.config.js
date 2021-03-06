const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');


module.exports = {
	entry: {
		app: './src/index.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {minimize: true}
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',
						options: {sourceMap: true}
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {sourceMap: true}
					},
					{
						loader: 'sass-loader',
						options: {sourceMap: true}
					}
				]
			},
			{
				test: /\.(png|jp(e*)g|svg|gif)$/,
				use: [{
					loader: 'file-loader?name=/textures/[name].[ext]'
				}]
			},
			{
				test: /\.(mp3|wav)$/,
				use: [{
					loader: 'file-loader?name=/sounds/[name].[ext]'
				}]
			},
			{
				test: /\.md2$/,
				use: [{
					loader: 'file-loader?name=/models/[name].[ext]'
				}]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: './index.html'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new UglifyJSPlugin({
			sourceMap: true
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new HardSourceWebpackPlugin()
	],
	devtool: 'source-map',
	devServer: {
		contentBase: './dist'
	}
};
