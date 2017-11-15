'use strict';
/* eslint-disable quote-props */
var codependency = require('codependency');
var requirePeer = codependency.register(module);

requirePeer('babel-eslint');

var verifyPeer = require('./verifyPeerDependency');
verifyPeer('babel-eslint');

module.exports = {
	'parser': 'babel-eslint',
	'parserOptions': {
		'ecmaFeatures': {
			'experimentalObjectRestSpread': true
		}
	}
};
