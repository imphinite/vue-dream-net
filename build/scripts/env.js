// This script processed the .env values and integrates them into
// system environment variables. As it utilizes dotenv lib it will
// not modify any environment variables that have already been set.

'use strict'

// Import required dependencies.
const dotenv = require('dotenv')
const chalk = require('chalk')


//
const allowedEnvironments = [
    'local',
    'testing',
    'dev',
    'stg',
    'uat',
    'master',
    'prod'
];

//
const defaultEnvironment = 'local'



// Execute script as child process.
function exec (cmd) {
    return require('child_process').execSync(cmd).toString().trim()
}

//
module.exports = function () {
    // Integrate .env values into variables.
    const env = dotenv.config()
    console.log(
        chalk.bgYellow.red(' RUN: ')
    )
    //
    var parsedAppEnv = undefined

    if ( env.parsed !== undefined ) {
        parsedAppEnv = (env.parsed.APP_ENV !== undefined) ? env.parsed.APP_ENV : undefined

    }

    // Process the app environment variable and set it to the defaultEnvironment
    // variable value, if it's not configured correctly.
    if ( parsedAppEnv === undefined || allowedEnvironments.indexOf(parsedAppEnv) === -1 ) {

        console.log(chalk.bgYellow.black('\n App enviroment variable from .env is not in the allowed enviroment list or was not set. '))
        console.log(
            chalk.bgYellow.black(' It was set as: ') +
                chalk.bgYellow.gray.bold(parsedAppEnv) +
                chalk.bgYellow.black(' and it will be replaced by: ') +
                chalk.bgYellow.gray.bold(defaultEnvironment + ' \n')
        )

        // Set app enviroment to the default value.
        process.env.APP_ENV = defaultEnvironment
    }
}
