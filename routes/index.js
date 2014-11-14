var express = require('express');
var router = express.Router();

var indexCtr = require('../controlls/index_controller');
var userCtr = require('../controlls/user_controller');

/* index */
router.route('/')
	.get(function (req, res){
		res.redirect('/login');
	});

/*  login   */
router.route('/login')
		.get(userCtr.init)
		.post(userCtr.login);

/* /index */
router.route('/index')
		.get(indexCtr.init);

module.exports = router;
