'use strict'

// Import the base webpack config.
const baseWebpackConfig = require('./webpack.base.conf')
// const merge = require('webpack-merge')


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


const webpackConfig = merge.smart(baseWebpackConfig, {
    mode: 'development',
    output: {
        filename: 'js/[name].js',
    },
    // module: {
    //     rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
    // },
    // cheap-module-eval-source-map is faster for development
    // devtool: config.dev.devtool,

    // these devServer options should be customized in /config/index.js

    // plugins: [

    // if (process.env.NODE_ENV == 'local')
    // {
    // }
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.SourceMapDevToolPlugin(),


    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //     filename: 'index.html',
    //     template: 'index.html',
    //     inject: true
    // }),
    // copy custom static assets
    // new CopyWebpackPlugin([
    //     {
    //         from: path.resolve(__dirname, '../static'),
    //         to: config.dev.assetsSubDirectory,
    //         ignore: ['.*']
    //     }
    // ])
    // ],
    // module: {
    //     rules: [
    //         createLintingRule()
    //     ]
    // },
    // optimization: {
    //     noEmitOnErrors: true,
    // },
})

module.exports = new Promise((resolve, reject) => {



    // console.dir(webpackConfig.plugins.keys())



    // const output = merge({
    //   customizeArray: merge.unique(
    //     webpackConfig,
    //     // plugin => plugin.constructor && plugin.constructor.name
    //   )
    // })({
    //   plugins: [
    //     new webpack.HotModuleReplacementPlugin()
    //   ]
    // }, {
    //   plugins: [
    //     // new webpack.HotModuleReplacementPlugin()
    //   ]
    // });



    //     let test = webpackConfig.plugins

    // // delete test[SourceMapDevToolPlugin];
    // console.log(webpackConfig)
    // process.exit(1)


    resolve(webpackConfig)


    // portfinder.basePort = process.env.PORT || config.dev.port
    // portfinder.getPort((err, port) => {
    //     if (err) {
    //         reject(err)
    //     } else {
    //         // publish the new Port, necessary for e2e tests
    //         process.env.PORT = port
    //         // add port to devServer config
    //         devWebpackConfig.devServer.port = port

    //         // Add FriendlyErrorsPlugin
    //         devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
    //             compilationSuccessInfo: {
    //                 messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
    //             },
    //             onErrors: config.dev.notifyOnErrors
    //                 ? utils.createNotifierCallback()
    //                 : undefined
    //         }))

    //         resolve(webpackConfig)
    //     }
    // })
})

// module.exports = new Promise((resolve, reject) => {
//     portfinder.basePort = process.env.PORT || config.dev.port
//     portfinder.getPort((err, port) => {
//         if (err) {
//             reject(err)
//         } else {
//             // publish the new Port, necessary for e2e tests
//             process.env.PORT = port
//             // add port to devServer config
//             devWebpackConfig.devServer.port = port

//             // Add FriendlyErrorsPlugin
//             devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
//                 compilationSuccessInfo: {
//                     messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
//                 },
//                 onErrors: config.dev.notifyOnErrors
//                     ? utils.createNotifierCallback()
//                     : undefined
//             }))

//             resolve(devWebpackConfig)
//         }
//     })
// })

