const path = require('path')
require('dotenv').config()
/* eslint-disable */
module.exports = {
    rootDir: path.resolve(__dirname, '../../'),
    moduleFileExtensions: [
        'js',
        'json',
        'vue'
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    transform: {
        // process js with babel-jest
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
        // process *.vue files with vue-jest
        '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
    },
    testMatch: [
        '<rootDir>/test/unit/specs/**/*.spec.js'
    ],
    snapshotSerializers: [
        '<rootDir>/node_modules/jest-serializer-vue'
    ],
    setupFiles: ['<rootDir>/test/unit/setup'],
    coverageDirectory: '<rootDir>/test/_reports',
    reporters: [
        "default",
        "jest-junit"
    ],
    collectCoverageFrom: [
        'src/**/*.{js,vue}',
        '!src/main.js',
        '!src/router/router.js',
        '!**/node_modules/**'
    ]
}
