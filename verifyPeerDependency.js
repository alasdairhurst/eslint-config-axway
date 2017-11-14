var package = require('./package.json');
var semver = require('semver');

function error(err, shouldThrow) {
	if (shouldThrow) {
		throw new Error(err);
	} else {
		console.error(err);
		process.exit(1);
	}
}

/**
 * Verifies that a dependency specified in optionalPeerDependencies is actually installed.
 * Rather than running at install time, this is meant to happen at runtime.
 * @param {string} dependency - name of dependency to verify
 * @param {boolean} shouldThrow - if true, the function will throw rather than exiting the process
 */
module.exports = function verifyPeerDependency(dependency, shouldThrow) {
	var version = package.optionalPeerDependencies[dependency];
	if (!version) {
		return error(package.name + ' does not specify ' + dependency + ' as an optionalPeerDependency.', shouldThrow);
	}
	var dependencyPath;
	try {
		dependencyPath = require.resolve(dependency);
	} catch (e) {
		return error(package.name + ' requires a dependency of ' + dependency + '@' + version + ' but none was installed.', shouldThrow);
	}
	console.log(dependencyPath);

	// check version
}