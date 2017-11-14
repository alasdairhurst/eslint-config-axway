const package = require('./package.json');

/**
 * Verifies that dependencies specified in optionalPeerDependencies are actually installed.
 * Rather than running at install time, this is meant to happen at runtime.
 * Throws an Error if dependency is not found
 * @param {string|array} dependency - name or list of names of dependencies to verify
 */
module.exports = function verifyPeerDependency(dependency, cb) {

	if (Array.isArray(dependency)) {
		return dependency.forEach(function(d) {
			verifyPeerDependency(d, cb);
		});
	}


	var version = package.optionalPeerDependencies[dependency];
	console.log(dependency, version, !version);
	if (!version) {
		throw new Error(package.name + ' does not specify ' + dependency + ' as an optionalPeerDependency.');
	}
	var dependencyPath;
	try {
		dependencyPath = require.resolve(dependency);
	} catch (e) {
		console.error(e);
		throw new Error(package.name + ' requires a dependency of ' + dependency + '@' + version + ' but none was installed.');
	}
	// check version
	console.log(dependencyPath);
}