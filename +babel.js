'use strict';
var codependency = require('codependency');
var requirePeer = codependency.register(module);

var babel = requirePeer('babel-eslint');

module.exports = {
	'parser': 'babel-eslint',
	'parserOptions': {
		'ecmaFeatures': {
			'experimentalObjectRestSpread': true
		}
	}
};
