const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        filename: 'main.bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    module: {
	rules: [
	    {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    transformAssetUrls: {
                        video: ['src', 'poster'],
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href'
                    },
                    prettify: true,
                    exposeFilename: false
                }
            },
	    {
	        test: /\.js/,  // include .js files
	        exclude: /node_modules/,  // exclude any and all files in the node_modules folder
	        loader: 'babel-loader'
	    },
	    {
                test: /\.(s*)[c|a]ss$/,
                use: ['style-loader','css-loader', 'sass-loader']
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[contenthash].[ext]',
                        outputPath: 'fonts/'
                    }
                }
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[contenthash].[ext]',
                    outputPath: 'images/'
                }
            }
	]
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve('src'),
        }
    },
    stats: {
    	colors: true
    },
    devtool: 'source-map'
};
