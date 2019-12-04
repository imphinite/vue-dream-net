'use strict'

// Import the base webpack config.
const baseWebpackConfig = require('./webpack.base.conf')


const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const copyWebpackPlugin = require('copy-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const scriptExthtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const terserPlugin = require('terser-webpack-plugin');
const safeParser = require('postcss-safe-parser');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const env = process.env.NODE_ENV === 'testing'
    ? require('../config/test.env')
    : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true,
            usePostCSS: true
        })
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
        path: config.build.assetsRoot,
        filename: 'js/[name].[contenthash].js'
    // filename: utils.assetsPath('js/[name].[contenthash].js'),
    },
    plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        // extract css into its own file
        new miniCssExtractPlugin({
            // filename: utils.assetsPath('css/[name].[contenthash].css'),
            filename: 'css/[name].[contenthash].css'
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new optimizeCSSPlugin({
            cssProcessorOptions: config.build.productionSourceMap
                ? {  parser: safeParser, map: { inline: false } }
                : {  parser: safeParser}
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new htmlWebpackPlugin({
            filename: process.env.NODE_ENV === 'testing'
                ? 'index.html'
                : config.build.index,
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks
            chunksSortMode: 'dependency'
        }),
        // keep module.id stable when vendor modules does not change
        new webpack.NamedChunksPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        // copy custom static assets
        new copyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ]),
        new scriptExthtmlWebpackPlugin({
            inline: /runtime\..*\.js$/
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: 'sourcemaps/[name].[contenthash].map',
            publicPath: 'https://assets.dev.scrawlr.systems/web/',
            fileContext: 'sourcemaps'
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                    name: 'chunk-elementUI', // split elementUI into a single package
                    priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                    name: 'chunk-commons',
                    test: resolve('src/components'), // can customize your rules
                    minChunks: 3, //  minimum common number
                    priority: 5,
                    reuseExistingChunk: true
                }
            },
        },
        runtimeChunk: 'single',
        // minimizer: [
        //     new terserPlugin({
        //         terserOptions: {
        //             compress: {
        //                 warnings: false
        //             }
        //         },
        //         sourceMap: config.build.productionSourceMap,
        //         parallel: true
        //     }),
        // ],
    },
})

// if (config.build.productionGzip) {
//     const CompressionWebpackPlugin = require('compression-webpack-plugin')

//     webpackConfig.plugins.push(
//         new CompressionWebpackPlugin({
//             filename: '[path].gz[query]',
//             algorithm: 'gzip',
//             test: new RegExp(
//                 '\\.(' +
//         config.build.productionGzipExtensions.join('|') +
//         ')$'
//             ),
//             threshold: 8192,
//             minRatio: 0.8
//         })
//     )
// }

// if (config.build.bundleAnalyzerReport) {
//     const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
//     webpackConfig.plugins.push(new BundleAnalyzerPlugin())
// }

module.exports = webpackConfig
