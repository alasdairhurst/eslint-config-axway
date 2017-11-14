var packageJSON = require('./package.json');
var semver = require('semver');
var path = require('path');
var findRoot = require('find-root');

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
 * @returns {void}
 */
module.exports = function verifyPeerDependency(dependency, shouldThrow) {
	var version = packageJSON.optionalPeerDependencies[dependency];
	if (!version) {
		return error(packageJSON.name + ' does not specify ' + dependency + ' as an optionalPeerDependency.', shouldThrow);
	}
	// Try to verify that the dependency is installed.
	var dependencyPath;
	try {
		dependencyPath = require.resolve(dependency);
	} catch (e) {
		return error(packageJSON.name + ' requires a dependency of ' + dependency + '@' + version + ' but none was installed.', shouldThrow);
	}
	// Find the closest package.json so that we can get the installed version of the dependency
	var root = findRoot(dependencyPath);

	if (root === dependencyPath) {
		// For whatever reason we couldn't find the package.json of the dependency
		return error('Cannot verify that ' + dependency + '@' + version + ' satisfies specified version', shouldThrow);
	}
	// eslint-disable-next-line security/detect-non-literal-require
	var dependencyPackage = require(path.join(root, 'package.json'));

	// Check version matches the required one
	if (!semver.valid(dependencyPackage.version)) {
		return error(packageJSON.name + ' requires a dependency of ' + dependency + '@' + version + ' but none was installed.', shouldThrow);
	}
};
