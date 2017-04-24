var express = require('express');
var finder = require('../service/finder');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
	var path = req.body.path;

  finder.getContents(path, function(err, contents) {
  	if (err) {
  		res.end(err.toString());
  	}
  	res.send(JSON.stringify(contents));
  });
});

module.exports = router;