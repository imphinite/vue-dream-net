const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { resolveFromRoot } = require('./scripts/paths.js');

module.exports = {
    mode: 'development',
    entry: {
        app: resolveFromRoot('/src/main.js')
    },
    output: {
        filename: 'main.bundle.js',
        path: resolveFromRoot('dist')
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
                loader: 'babel-loader',
                include: [
                    resolveFromRoot('src'),
                    resolveFromRoot('test'),
                    resolveFromRoot('node_modules/webpack-dev-server/client')
                ]
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        // Requires sass-loader@^8.0.0
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                fiber: require('fibers'),
                                indentedSyntax: true // optional
                            },
                        },
                    },
                ],
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
            '@': resolveFromRoot('src'),
        }
    },
    stats: {
    	colors: true
    },
    devtool: 'source-map'
};
