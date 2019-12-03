'use strict'

// Import required dependencies.
const baseWebpackConfig = require('./webpack.base.conf')
const chalk = require('chalk')
const merge = require('webpack-merge')

// Import project configuration.
const config = require('./config.js')

// Merge any additional configurations into the base config.
const webpackConfig = merge.smart(baseWebpackConfig, {})


// #######################
// ## Debug build tools ##
// #######################

if (config.debug.showWebpackConfig) {
    console.log(chalk.bold.red('>>> Start of WebpackConfig'))
    console.log(JSON.stringify(webpackConfig, null, 2))
    console.log(chalk.bold.red('<<< End of WebpackConfig'))
    process.exit(0)
}

// Export the build Webpack configuration.
module.exports = new Promise((resolve, reject) => {
    resolve(webpackConfig)
})
