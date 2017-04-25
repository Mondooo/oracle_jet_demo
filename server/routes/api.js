var express = require('express');
var finder = require('../service/finder');
var router = express.Router();

router.post('/', function(req, res, next) {
	var dirPath = req.body.path;

	finder.getContents(dirPath, function(err, data) {
		if (err) res.end(err.toString());
		
		res.end(JSON.stringify(data));
	});
});

module.exports = router;