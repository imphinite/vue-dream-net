// This utility checks if base project requirements
// for npm and node minimal versions are satisfied.

'use strict'

// Import required dependencies.
const chalk = require('chalk')
const ora = require('ora')
const packageConfig = require('../../package.json')
const semver = require('semver')
const shell = require('shelljs')
const spinner = ora()

// Execute script as child process.
function exec (cmd) {
    return require('child_process').execSync(cmd).toString().trim()
}

// Compile requirements and current system state.
const versionRequirements = [
    {
        name: 'node',
        currentVersion: semver.clean(process.version),
        versionRequirement: packageConfig.engines.node
    },
    {
        name: 'npm',
        currentVersion: exec('npm --version'),
        versionRequirement: packageConfig.engines.npm
    }
]

// Process requirement related warnings.
module.exports = function () {
    // Start status CLI indicator.
    spinner.start('Checking base compile requirements.')

    const warnings = []

    // Process compiled versionRequirements.
    for (let i = 0; i < versionRequirements.length; i++) {
        const mod = versionRequirements[i]

        if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
            warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
            )
        }
    }

    if (warnings.length) {
        // Stop status CLI indicator with a failure message.
        spinner.fail('Project compile requirements have not been satisfied.')

        console.log('')
        console.log(chalk.bgRedBright.gray('  To compile this project, please review the following requirements:'))

        for (let i = 0; i < warnings.length; i++) {
            const warning = warnings[i]
            console.log('  ' + warning)
        }

        console.log()
        process.exit(1)
    }

    // Stop status CLI indicator with a success message.
    spinner.succeed('Project compile requirements successfully verified.')
}
