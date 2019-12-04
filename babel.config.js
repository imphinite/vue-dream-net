module.exports = {
    "presets": [
        "@babel/preset-env"
    ],
    "plugins": [
        "transform-vue-jsx",
        "@babel/plugin-transform-runtime",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-object-rest-spread"
    ],
    "env": {
        "test": {
            "plugins": [
            "transform-vue-jsx",
            "@babel/plugin-transform-modules-commonjs",
            "dynamic-import-node"
            ]
        }
    },
    "sourceType": "unambiguous" //
}
