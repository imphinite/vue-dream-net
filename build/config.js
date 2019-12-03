'use strict'


// Process and integrate .env variables.
require('./scripts/env')()

// Import required dependencies.
const { resolveFromRoot } = require('./scripts/paths.js')

// Shorten process env variable name
// for concise code.
const pe = process.env

// Set name of the build directory.
// This is used within the build command as the root directory
// for asset generation.
const base_buildDir = pe.build_buildDir ? pe.build_buildDir : 'dist'


function processBool (value)
{
    if (value === 'true') {
        return true
    }

    if (value === 'false') {
        return false
    }

    if (value) {
        return true
    }

    return false
}


// ##############################
// ### Configuration sections ###
// ##############################

// Core configuration
const configCore = {
    //
    appName: pe.core_appName ?
        pe.core_appName :
        'A Scrawlr Systems app',

    //
    appDescription: pe.core_appDescription ?
        pe.core_appDescription :
        '',

    appRelease: pe.appRelease ?
        pe.appRelease :
        'n/a',

    appRootUrl: pe.core_appRootUrl ? pe.core_appRootUrl : 'http://localhost:8080',

    //
    mode: pe.core_mode ?
        pe.core_mode :
        'production', // posible values: https://webpack.js.org/configuration/mode/#root

    //
    output: {
        path: pe.build_outputPath ? pe.build_outputPath : resolveFromRoot(base_buildDir),
        filename: pe.build_jsFileName ? pe.build_jsFileName : 'js/[name].[hash].js',
        publicPath: pe.build_assetPath ? pe.build_assetPath : '/',
    },

    //
    target: pe.core_target ?
        pe.core_target :
        'web', // posible values: https://webpack.js.org/configuration/target/
}

const configServe = {
    // Server parameters
    host: pe.serve_host ? pe.serve_host : 'localhost',
    port: pe.serve_port ? pe.serve_port : 8080,
    proxyTable: pe.serve_proxyTable ? pe.serve_proxyTable : {},
    useCompression: pe.serve_useCompression ? processBool(pe.serve_useCompression) : true,

    // Compile behaviour
    useHotReload: pe.serve_useHotReload ? processBool(pe.serve_useHotReload) : true,
    autoOpenBrowser: pe.serve_autoOpenBrowser ? processBool(pe.serve_autoOpenBrowser) : false,

    // Issue reporting
    logLevel: pe.serve_logLevel ? pe.serve_logLevel : 'warning', // accepted values: https://webpack.js.org/configuration/dev-server/#devserverclientloglevel
}

// Loaders configuration
const configLoaders = {
    styleLoaders: {
        extract: true,
        usePostCSS: true
    }
}

// Plugins configuration
const configPlugins = {
    dotEnvPlugin: {
        path: resolveFromRoot('.env'),
        safe: false,
        defaults: false,
        systemvars: false
    },
    htmlWebpackPlugin: {
        title: configCore.appName,
        filename: pe.plugins_htmlWebpackPlugin_filename ?
            pe.plugins_htmlWebpackPlugin_filename :
            'index.html',
        template: pe.plugins_htmlWebpackPlugin_template ?
            pe.plugins_htmlWebpackPlugin_template :
            resolveFromRoot('src/templates/index.html'),
        inject: pe.plugins_htmlWebpackPlugin_inject ?
            processBool(pe.plugins_htmlWebpackPlugin_inject) :
            true,
        //
        meta: {
            'scrw:app-release': configCore.appRelease
        },
        minify: {
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
            removeComments: pe.plugins_htmlWebpackPlugin_minify_removeComments ?
                processBool(pe.plugins_htmlWebpackPlugin_minify_removeComments) :
                false,
            collapseWhitespace: pe.plugins_htmlWebpackPlugin_minify_collapseWhitespace ?
                processBool(pe.plugins_htmlWebpackPlugin_minify_collapseWhitespace) :
                false,
            removeRedundantAttributes: pe.plugins_htmlWebpackPlugin_minify_removeRedundantAttributes ?
                processBool(pe.plugins_htmlWebpackPlugin_minify_removeRedundantAttributes) :
                false,
            removeScriptTypeAttributes: pe.plugins_htmlWebpackPlugin_minify_removeScriptTypeAttributes ?
                processBool(pe.plugins_htmlWebpackPlugin_minify_removeScriptTypeAttributes) :
                false,
            removeStyleLinkTypeAttributes: pe.plugins_htmlWebpackPlugin_minify_removeStyleLinkTypeAttributes ?
                processBool(pe.plugins_htmlWebpackPlugin_minify_removeStyleLinkTypeAttributes) :
                false,
            useShortDoctype: pe.plugins_htmlWebpackPlugin_minify_useShortDoctype ?
                processBool(pe.plugins_htmlWebpackPlugin_minify_useShortDoctype) :
                false
        },
        chunksSortMode: 'dependency'
    },
    // Enhances html-webpack-plugin
    // https://www.npmjs.com/package/enhanced-script-ext-html-webpack-plugin
    useEshwp: pe.plugins_useEshwp ? processBool(pe.plugins_useEshwp) : false,
    eshwp: {}
}

// Asset handling configuration
const configAssets = {
    // Asset compression
    compressAssets: pe.assets_compressAssets ? processBool(pe.assets_compressAssets) : false,
    assetCompressionOptions: {
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        deleteOriginalAssets: false,
        test: new RegExp(
            '\\.(' + ['js', 'css', 'svg', 'png'].join('|') + ')$'
        ),
        threshold: 8192,
        minRatio: 0.8
    },
    // assetCo,mpressionExtensions: ['js', 'css', 'svg', 'png'],

    // JS source map generation
    genSMaps: pe.assets_genSMaps ?
        processBool(pe.assets_genSMaps) :
        false,
    sMapOpt: {
        filename: 'sourcemaps/[name].[contenthash].map',
        publicPath: configCore.output.publicPath,
        fileContext: 'sourcemaps'
    }
}

// Progressive web app build options
const configPwa = {
    // Favicon generation
    genPwa: pe.pwa_generatePwa ?
        processBool(pe.pwa_generatePwa) :
        true,
    pwaOptions: {
        logo: resolveFromRoot('src/assets/logo-white.svg'),
        cache: true,
        prefix: 'favicons/',
        inject: true,
        // Favicons configuration options (see below)
        favicons: {
            appName: configCore.appName,
            appDescription: configCore.appDescription,
            version: configCore.appRelease,
            developerName: 'Scrawlr',
            developerURL: null, // prevent retrieving from the nearest package.json
            background: '#fff',
            theme_color: '#fff',
            display: 'standalone',
            start_url: configCore.appRootUrl+'/index.html',
            icons: {
                coast: false,
                yandex: false
            }
        }
    }
}

// Optimizers configuration
const configOptimizations = {
    // JS optimisation
    optimiseJs: pe.optimizations_optimiseJs?
        processBool(pe.optimizations_optimiseJs) :
        false,
    optimiseJsOptions: {
        extractComments: {
            condition: 'some',
            filename: (file) => {
                return `/licenses/${file}.LICENSE`;
            },
            banner: (licenseFile) => {
                return `License information can be found in ${licenseFile}`;
            },
        },
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {},
            mangle: true, // Note `mangle.properties` is `false` by default.
            module: false,
            output: null,
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_classnames: undefined,
            keep_fnames: false,
            safari10: false,
        },
    },

    // CSS optimisation
    optimiseCss: pe.optimizations_optimiseCss ?
        processBool(pe.optimizations_optimiseCss) :
        false,
    optimiseCssOptions: {
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
            preset: [
                'default',
                {
                    discardComments: {
                        removeAll: true
                    }
                }
            ],
        },
        canPrint: true
    }
}

// Code spliting tools configuration
const configCodeSpliting = {

    // Global code spliting options.
    chunks: pe.split_chunks ? pe.split_chunks : 'all', // posible values: all, async, and initial
    maxInitialRequests: pe.split_maxInitialRequests ? pe.split_maxInitialRequests : 30,
    maxAsyncRequests: pe.split_maxAsyncRequests ? pe.split_maxAsyncRequests : 20,
    minSize: pe.split_minSize ? pe.split_minSize : 300,
    maxSize: pe.split_maxSize ? pe.split_maxSize : 0,

    //
    separateVendorAssets: pe.split_separateVendorAssets ? processBool(pe.split_separateVendorAssets) : false,
    vendorAssetSplitType: pe.split_vendorAssetSplitType ? pe.split_vendorAssetSplitType : 'base', // posible values: base, byPackage
}

// Analytical tools configuration
const configAnalysis = {
    //
    // https://www.npmjs.com/package/duplicate-package-checker-webpack-plugin
    showDuplicatePackageChecker: pe.analysis_showDuplicatePackageChecker ? processBool(pe.analysis_showDuplicatePackageChecker) : false,
    duplicatePackageCheckerOptions: {
        // Also show module that is requiring each duplicate package (default: false)
        verbose: pe.analysis_duplicatePackageChecker_verbose ?
            processBool(pe.analysis_duplicatePackageChecker_verbose) :
            false,
        // Emit errors instead of warnings (default: false)
        emitError: pe.analysis_duplicatePackageChecker_emitError ?
            processBool(pe.analysis_duplicatePackageChecker_emitError) :
            false,
        // Show help message if duplicate packages are found (default: true)
        showHelp: pe.analysis_duplicatePackageChecker_showHelp ?
            processBool(pe.analysis_duplicatePackageChecker_showHelp) :
            true,
        // Warn also if major versions differ (default: true)
        strict: pe.analysis_duplicatePackageChecker_strict ?
            processBool(pe.analysis_duplicatePackageChecker_strict) :
            false,
    },

    // Indicate whether to show the bundle analyzer report after the build.
    showBundleAnalyzerReport: pe.analysis_showBundleAnalyzerReport ? processBool(pe.analysis_showBundleAnalyzerReport) : false,
    bundleAnalyzerReportOptions: {
        analyzerMode: pe.analysis_bundleAnalyzerReportOptions_analyzerMode ? pe.analysis_bundleAnalyzerReportOptions_analyzerMode : 'static',
        generateStatsFile: false,
        statsOptions: { source: false }
    }
}

// Debug options configuration
const configDebug = {
    // If true only output the webpack config and stop other operations.
    showWebpackConfig: pe.debug_showConfig ? processBool(pe.debug_showConfig) : false,

    lintOnCompile: pe.debug_lintOnCompile ? processBool(pe.debug_lintOnCompile) : true,
    lintOnCompileOptions: {
        showInOverlay: pe.debug_lintOnCompileOptions_showInOverlay ?
            processBool(pe.debug_lintOnCompileOptions_showInOverlay) :
            true,
    }
}


module.exports = {
    core: configCore,
    serve: configServe,
    plugins: configPlugins,
    loaders: configLoaders,
    build: {
        // Source maps
        sourceMaps: pe.build_sourceMaps ? pe.build_sourceMaps : 'none',
    },
    assets: configAssets,
    pwa: configPwa,
    optimizations: configOptimizations,
    codeSpliting: configCodeSpliting,
    analysis: configAnalysis,
    debug: configDebug
}
