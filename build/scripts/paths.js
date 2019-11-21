// Path utils.

'use strict'

// Import required dependencies.
const p = require('path')

// Set project root path.
const projectRoot = p.join(__dirname, '../../')

//
exports.getRoot = function () {
    return projectRoot
}

//
exports.resolveFromRoot = function (path) {

    // Set to empty var if no path is passed.
    if (path === undefined) {
        path = ''
    }

    // Correct if path starts with "/"
    if (path.startsWith('/')) {
        path = '.' + path
    }

    return p.resolve(projectRoot, path)
}
