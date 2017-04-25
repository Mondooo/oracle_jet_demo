var fs = require('fs');
var path = require('path');
var finder = {};

finder.getContents = function(dirPath, fn) {
	var contents = [];

	fs.readdir(dirPath, function(err, files) {
		if (err) {
			fn(err);
			return;
		} else if (files.length === 0) { // empty directory
			fn(null, [{
				'attr': {
					'style': 'display:none;'
				}
			}]);
			return;
		}

		files.forEach(function(file) {
			var fileUri = dirPath + file;
			var content = {
				'attr': {
					'uri': fileUri,
				},
				'title': file
			}

			fs.access(fileUri, fs.constants.R_OK, function(err) {
				if (err) {
					content.attr.class = 'css-hide';
				}

				fs.stat(fileUri, function(err, stats) {
					if (err) {
						fn(err);
						return;
					}
					content.children = stats.isDirectory() === true ? [] : undefined;

					contents.push(content);

					// invoke call back after traversal
					if (files.indexOf(file) === (files.length - 1)) {
						fn(null, contents);
					}
				});
			});
		});
	});
}

module.exports = finder;