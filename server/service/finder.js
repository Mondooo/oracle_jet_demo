var fs = require('fs');
var path = require('path');
var Promise = require('promise');
var finder = {};

function readdirAsyn(dirPath) {
	var promise = new Promise(function(resolve, reject) {
		fs.readdir(dirPath, function(err, files) {
			if (err) reject(err);
			else resolve(files);
		});
	});
	return promise;
}

function readPermissionCheckAsyn(fileUri) {
	var promise = new Promise(function(resolve, reject) {
		fs.access(fileUri, fs.constants.R_OK, function(err) {
			if (err) resolve(false);
			else resolve(true);
		});
	});
	return promise;
}

function typeCheckAsyn(fileUri) {
	var promise = new Promise(function(resolve, reject) {
		fs.stat(fileUri, function(err, stats) {
			if (err) reject(err);
			else resolve(stats.isDirectory());
		});
	});
	return promise;
}

finder.getContents = function(dirPath, fn) {
	var contents = [];
	var handledCount = 0;

	readdirAsyn(dirPath).then(function(files) {
		if (handledCount === files.length) fn(null, contents);

		files.forEach(function(file) {
			var fileUri = dirPath + file;
			var content = {
				'path': fileUri,
				'name': file
			}
			var readPromise = readPermissionCheckAsyn(fileUri),
				typePromise = typeCheckAsyn(fileUri);

			// parallel promises
			Promise.all([readPromise, typePromise]).then(function(results) {
				handledCount++;

				var hasPermission = results[0],
					isDirectory   = results[1];
				if (hasPermission) {
					content.type = isDirectory ? 'directory' : 'file';
					contents.push(content);
				}
				if (handledCount === files.length) fn(null, contents);

			}, function(errs) {
				fn(errs);
			});
		});

	},function(err) {
		return fn(err);
	});
}

module.exports = finder;