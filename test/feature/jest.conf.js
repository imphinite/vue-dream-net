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
        '<rootDir>/test/feature/specs/**/*.spec.js'
    ],
    snapshotSerializers: [
        '<rootDir>/node_modules/jest-serializer-vue'
    ],
    setupFiles: [],
    setupFilesAfterEnv: ['<rootDir>/test/feature/jest.setup.js'],
    coverageDirectory: '<rootDir>/test/_reports',
    collectCoverageFrom: [
        'src/**/*.{js,vue}',
        '!src/main.js',
        '!src/router/index.js',
        '!**/node_modules/**'
    ],
    globals:{
    },
    verbose: true,
}
