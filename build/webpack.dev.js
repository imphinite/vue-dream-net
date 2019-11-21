const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { resolveFromRoot } = require('./scripts/paths');

module.exports = merge(common, {
	mode: 'development',
	devServer: {
		contentBase: resolveFromRoot('dist'),
		compress: true,
		port: 9000
	}
});