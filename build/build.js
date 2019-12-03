'use strict'

// Process and integrate .env variables.
require('./scripts/env')()


// Import required dependencies.
const chalk = require('chalk')
const config = require('../config')
const ora = require('ora')
const path = require('path')
const rm = require('rimraf')
const spinner = ora()
const webpack = require('webpack')

// Prepare build folder.
const prepareBuild = () => new Promise((resolve, reject) => {
    // Reject if the project enviroment is not set.
    if (process.env.APP_ENV === undefined) {
        reject('Project enviroment not set. Check process.env.APP_ENV')
        return
    }

    // Set webpack config for the specified env
    const webpackConfig = require('./webpack.build.conf')

    // Start the CLI process indicator.
    spinner.start('Cleaning and preparing the build folder.')

    // Clean the build root folder.
    rm(path.resolve(config.build.buildRoot), err => {
        if (err) reject(err)

        // Persist the CLI indicator message and indicate
        // that the build folder preparation has completed.
        spinner.stopAndPersist({symbol: '✔', text: 'Prepared the build folder.'});

        // console.log(webpackConfig)
        // process.exit(1)

        resolve(webpackConfig);
    })
})

// Run project build.
const runBuild = (webpackConfig) => new Promise((resolve, reject) => {

    // Reject if the webpack configuration was not generated/passed correctly.
    if (webpackConfig === undefined) {
        reject('webpackConfig not set. Check process.env.APP_ENV')
    }

    // Start status CLI indicator.
    spinner.start('Building project for ' + chalk.bold(process.env.APP_ENV) + ' enviroment.')

    // Start webpack build
    webpack(webpackConfig, (err, stats) => {

        // console.log(err)
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false, // if you are using ts-loader, setting this to true will make typescript errors show up during build
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        if (stats.hasErrors()) {
            // console.log(chalk.red('  Build failed with errors.\n'))
            spinner.fail('Build failed with errors')
            process.exit(1)
        }

        spinner.info('Project build files are located in the ' + config.build.buildRoot + ' directory.').start()

        resolve();
        // spinner.succeed('Build completed')
        // console.log(chalk.cyan('  Build complete.\n'))
        // console.log(chalk.yellow(
        //   '  Tip: built files are meant to be served over an HTTP server.\n' +
        //   '  Opening index.html over file:// won\'t work.\n'
        // ))
    })



    // console.log(chalk.red('\n' + ' runBuild.\n'))



    // spinner.start()

    // prepareBuild()
    // .then(() => {
    //     console.log('then')
    // })
    // .done(() => {
    //     console.log('done')
    // })
    // .catch(err => {

    // // Stop spinner with a fail satte.
    // spinner.fail('Build failed with errors.')

    // // Output error.
    // console.log(chalk.red('\n' + err + '  Build failed with errors.\n'))
    // })

    // spinner.succeed('done')

    // rm(path.resolve(config.build.buildRoot+'ss'), err => {
    //     if (err) throw err
    // })


    // if (Math.random() * 100 < 90) {
    //   reject(new Error('The promise was rejected by using reject function.'));
    // }
    // throw new Error('The promise was rejected by throwing an error');
});



// Run project build flow.
prepareBuild()
    // // .then((webpackConfig) => console.log(webpackConfig))
    .then((webpackConfig) => runBuild(webpackConfig))
    .then(() => spinner.succeed('Build Completed.'))
    .catch(err => {
        spinner.fail('Build failed with errors')
        console.log(err)
    })

// prepareBuild()
//   .then(() => {
//     throw new Error();
//   })
//   .catch(err => {
//     // Stop spinner with a fail satte.
//     spinner.fail('Build failed with errors.')

//     // Output error.
//     console.log(chalk.red('\n' + err + '  Build failed with errors.\n'))
//   })




// prepareBuild()
//   .then(() => {
//     throw new Error();
//   })
//   .catch(err => console.log(err));



// Clean dist.
// rm(path.join(config.build.assetsSubDirectory), err => {



// console.log(config.build.buildRoot)


// rm( path.join(__dirname, "./uploads/*")), (err) => { ... });



// spinner.info('Cleaning and preparing the build folder.').start()

// spinner.stopAndPersist({symbol: '@', text: 'all done'});
// spinner.start()
// rm(path.resolve(config.build.buildRoot), err => {

//     // spinner.stopAndPersist({symbol: '✔', text: 'Cleaning and preparing the build folder.'});

//     if (err) throw err

//     spinner.stopAndPersist({symbol: '✔', text: 'Completed preparing the build folder.'});
//     spinner.start()
//     setTimeout(function () {
//         spinner.succeed('Build completed')
//                     //console.log("done");
//             }, 2000);

//     // webpack(webpackConfig, (err, stats) => {
//     //     if (err) throw err
//     //     process.stdout.write(stats.toString({
//     //       colors: true,
//     //       modules: false,
//     //       children: false, // if you are using ts-loader, setting this to true will make typescript errors show up during build
//     //       chunks: false,
//     //       chunkModules: false
//     //     }) + '\n\n')

//     //     if (stats.hasErrors()) {
//     //       // console.log(chalk.red('  Build failed with errors.\n'))
//     //       spinner.fail('Build failed with errors')
//     //       process.exit(1)
//     //     }

//     //     spinner.succeed('Build completed')
//     //     // console.log(chalk.cyan('  Build complete.\n'))
//     //     // console.log(chalk.yellow(
//     //     //   '  Tip: built files are meant to be served over an HTTP server.\n' +
//     //     //   '  Opening index.html over file:// won\'t work.\n'
//     //     // ))
//     //   })



// })



//
//
//
// console.log(path.join(config.build.assetsRoot, config.build.assetsSubDirectory))


// rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
//   if (err) throw err
//   webpack(webpackConfig, (err, stats) => {
//     spinner.stop()
//     if (err) throw err
//     process.stdout.write(stats.toString({
//       colors: true,
//       modules: false,
//       children: false, // if you are using ts-loader, setting this to true will make typescript errors show up during build
//       chunks: false,
//       chunkModules: false
//     }) + '\n\n')

//     if (stats.hasErrors()) {
//       console.log(chalk.red('  Build failed with errors.\n'))
//       process.exit(1)
//     }

//     console.log(chalk.cyan('  Build complete.\n'))
//     console.log(chalk.yellow(
//       '  Tip: built files are meant to be served over an HTTP server.\n' +
//       '  Opening index.html over file:// won\'t work.\n'
//     ))
//   })
// })
