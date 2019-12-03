'use strict'

// Run base proejct compile requirements check.
require('./scripts/requirements')()

// Process and integrate .env variables.
// TODO resolve that the env script is not run multiple times.
require('./scripts/env')()


// Import required dependencies.
const webpack = require('webpack')
const path = require('path')
const dotEnv = require('dotenv-webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const utils = require('./utils')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// Import project configuration.
const config = require('./config.js')


const HtmlWebpackPlugin = require('html-webpack-plugin')


// const vueLoaderConfig = require('./vue-loader.conf')


const miniCssExtractPlugin = require('mini-css-extract-plugin')

// const config = require('../config')
// console.log(process.env.DB_HOST)

// console.log(process.env.APP_ENV)

// const path = require('path')

// const env = require('dotenv').config()
//


const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')



const { resolveFromRoot } = require('./scripts/paths.js')

// console.log(getRoot())
// console.log(resolveFromRoot('src/main.js'))

// process.exit(0)



// function resolve (dir) {
//     return path.join(__dirname, '..', dir)
// }

// console.log(process.env)

// console.log(new dotenv({
//           path: path.resolve(__dirname, '..', '.env'),
//           safe: false,
//           defaults: false,
//           systemvars: false
//    }).definitions['process.env.DB_HOST']);


const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolveFromRoot('src'), resolveFromRoot('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: config.debug.lintOnCompileOptions.showInOverlay
    }
})


// Compile webpack config options
const webpackConfig = {
    // ## Core ##
    // Application entry point.
    entry: {
        app: resolveFromRoot('/src/main.js')
    },
    mode: config.core.mode,
    output: config.core.output,
    context: resolveFromRoot('src'),
    target: config.core.target,

    devtool: config.build.sourceMaps,

    module: {
        rules: [
            ...(config.debug.lintOnCompile ? [createLintingRule()] : []),
            ...utils.styleLoaders(config.loaders.styleLoaders),
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
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolveFromRoot('src'), resolveFromRoot('test'), resolveFromRoot('node_modules/webpack-dev-server/client')]
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
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolveFromRoot('src'),
        }
    },

    //
    optimization: {
        minimizer: [],
        runtimeChunk: 'single',
        splitChunks: {
            chunks: config.codeSpliting.chunks,
            maxInitialRequests: config.codeSpliting.maxInitialRequests,
            maxAsyncRequests: config.codeSpliting.maxAsyncRequests,
            minSize: config.codeSpliting.minSize,
            maxSize: config.codeSpliting.maxSize,
            cacheGroups: {
            }
        }
    },
    plugins: [
        // Define runtime env.
        new webpack.DefinePlugin({
            'process.env': {
                appName: JSON.stringify(config.core.appName),
                // Define release / version
                appRelease: JSON.stringify(config.core.appRelease),
            },
        }),
        // TODO: notes
        new dotEnv(config.plugins.dotEnvPlugin),

        // TODO: notes
        new VueLoaderPlugin(),

        // TODO: notes
        new HtmlWebpackPlugin(config.plugins.htmlWebpackPlugin),

        // TODO: notes
        new copyWebpackPlugin([
            {
                from: resolveFromRoot('static'),
                to: config.core.output.path,
                ignore: ['.*']
            }
        ]),

        new miniCssExtractPlugin({
            // filename: utils.assetsPath('css/[name].[contenthash].css'),
            filename: 'css/[name].[contenthash].css'
        }),

        new ExtractCssChunks(
            {
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: 'css/[name].[contenthash].css',
                chunkFilename: 'css/chunks/[id].[contenthash].css',
                orderWarning: true, // Disable to remove warnings about conflicting order between imports
            }
        )
    ],
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}





// ##########################
// ##### Asset handling #####
// ##########################

// Integrate enhanced html-webpack-plugin functionality
if (config.plugins.useEshwp) {
    const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
    webpackConfig.plugins.push(
        new ScriptExtHtmlWebpackPlugin({
            custom: {
                test: /\.js$/,
                attribute: 'crossorigin',
                value: 'anonymous'
            },
            preload: {
                test: /\.js$/
            }
        })
    )
}

// Integrate asset commpression.
if (config.assets.compressAssets) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')
    webpackConfig.plugins.push(
        new CompressionWebpackPlugin(config.assets.assetCompressionOptions)
    )
}

// Integrate js sourcemap generation.
if (config.assets.genSMaps) {
    webpackConfig.plugins.push(
        new webpack.SourceMapDevToolPlugin(config.assets.sMapOpt)
    )
}

// ##########################
// ##### PWA build #####
// ##########################

// Integrate PWA build options
if (config.pwa.genPwa) {
    const WebappWebpackPlugin = require('webapp-webpack-plugin')
    webpackConfig.plugins.push(
        new WebappWebpackPlugin(config.pwa.pwaOptions)
    )
}

// #########################
// ##### Optimizations #####
// #########################

if (config.optimizations.optimiseJs) {
    const TerserPlugin = require('terser-webpack-plugin');
    webpackConfig.optimization.minimizer.push(
        new TerserPlugin(config.optimizations.optimiseJsOptions)
    )
}

if (config.optimizations.optimiseCss) {
    const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
    webpackConfig.optimization.minimizer.push(
        new OptimizeCSSPlugin(config.optimizations.optimiseCssOptions)
    )
}

// #########################
// ##### Code Spliting #####
// #########################

if (config.codeSpliting.separateVendorAssets) {
    switch (config.codeSpliting.vendorAssetSplitType) {
        case 'byPackage':
            webpackConfig.optimization.splitChunks.cacheGroups.vendor = {
                test: /[\\/]node_modules[\\/]/,
                name (module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                    const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                    // npm package names are URL-safe, but some servers don't like @ symbols
                    return `vendor/${packageName.replace('@', '')}`;
                },
                reuseExistingChunk: true,
                priority: 20
            }
            break;
        case 'base':
        default:
            webpackConfig.optimization.splitChunks.cacheGroups.vendor = {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all',
                reuseExistingChunk: true,
                priority: 20
            }
    }
}

// ##########################
// ##### Analysis tools #####
// ##########################

// Integrate multiple/duplicate package usage analysis.
if (config.analysis.showDuplicatePackageChecker) {
    const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
    webpackConfig.plugins.push(
        new DuplicatePackageCheckerPlugin(config.analysis.duplicatePackageCheckerOptions)
    )
}

// Integrate bundle analysis if enabled.
if (config.analysis.showBundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(
        new BundleAnalyzerPlugin(config.analysis.bundleAnalyzerReportOptions)
    )
}



// Export the base Webpack configuration.
module.exports = webpackConfig
