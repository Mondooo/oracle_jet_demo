var fs = require('fs');
var path = require('path');
var finder = {};

finder.getContents = function(folder, callback) {
	var contents = [];
	try {
		fs.readdir(folder, (err, files) => {
			if (err) {
				callback(err);
				return;
			} else if (files.length === 0) {
				callback(null, [{}]);
				return;
			}
			files.forEach(file => {
				var content = {}; // store file/directory info.
				var fileUri = folder + file;
				content.attr = {
					'uri': fileUri
				}
				content.title = file;

				fs.stat(fileUri, (err, stats) => {
					if (err) {
						callback(err);
						return;
					}

					var type = stats.isDirectory() === true ? 'directory' : 'file';
					if (type === 'directory') content.children = [];
					contents.push(content);

					if (files.indexOf(file) === (files.length - 1)) {
						callback(null, contents);
					}
				});
			});

		});
	} catch(e) {
		if (e.code == "EACCES") {
			// User don't have persissions
			console.log(e);
			callback(e.code);
		} else throw e;
	}
	
}

module.exports = finder;