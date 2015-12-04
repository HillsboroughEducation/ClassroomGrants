var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.json({message: 'test api controller is online'});
});

module.exports = router;