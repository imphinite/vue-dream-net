'use strict'

// Import the base webpack config.
const baseWebpackConfig = require('./webpack.base.conf')


const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const WebpackPwaManifest = require('webpack-pwa-manifest')

const config2 = require('./config.js')
const chalk = require('chalk')

const DashboardPlugin = require('webpack-dashboard/plugin')

// const HOST = process.env.HOST
// const PORT = process.env.PORT && Number(process.env.PORT)
// console.log(config2.serve.port)
const webpackConfig = merge(baseWebpackConfig, {
    // mode: 'development',
    // module: {
    //     rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
    // },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,

    // these devServer options should be customized in /config/index.js
    devServer: {
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
            ],
        },

        // Server parameters
        host: config2.serve.host,
        port: config2.serve.port,
        proxy: config2.serve.proxyTable,
        compress: config2.serve.useCompression,
        contentBase: false, // since we use CopyWebpackPlugin.

        // Compile behaviour
        hot: config2.serve.useHotReload,
        open: config2.serve.autoOpenBrowser,
        watchOptions: {
            poll: false,
        },

        // Issue reporting
        clientLogLevel: config2.serve.logLevel,
        overlay: config2.debug.lintOnCompileOptions.showInOverlay
            ? { warnings: false, errors: true }
            : false,


        publicPath: config.dev.assetsPublicPath,
        // Other
        quiet: true, // necessary for FriendlyErrorsPlugin

    },
    plugins: [
        new DashboardPlugin(),
        // new WebpackPwaManifest({
        //   name: process.env.APP_NAME,
        //   short_name: process.env.APP_NAME,
        //   description: process.env.APP_DESC,
        //   background_color: '#ffffff',
        //   crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        //   icons: [
        //     {
        //       src: path.resolve('static/logo-white.png'),
        //       sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        //     }
        //   ]
        // }),
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: 'index.html',
        //     inject: true
        // }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config2.core.output.path,
                ignore: ['.*']
            }
        ])
    ],
    optimization: {
        noEmitOnErrors: true,
    },
})


// #######################
// ## Debug build tools ##
// #######################

if (config2.debug.showWebpackConfig) {
    console.log(chalk.bold.red('>>> Start of WebpackConfig'))
    console.log(JSON.stringify(webpackConfig, null, 2))
    console.log(chalk.bold.red('<<< End of WebpackConfig'))
    process.exit(0)
}

//
module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = config2.serve.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port

            // add port to devServer config
            webpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            webpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${webpackConfig.devServer.host}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors
                    ? utils.createNotifierCallback()
                    : undefined
            }))

            resolve(webpackConfig)
        }
    })
})

