var express = require('express');
var crypto = require('crypto');
var User = require('../models/user');
var Auth_mdw = require('../middlewares/auth');

var router = express.Router();
var secret = 'achmadfatkharrofiqi';
var session_store;

var default_password = crypto.createHmac('sha256', secret)
                          .update('default')
                          .digest('hex');

router.get('/', Auth_mdw.check_login, Auth_mdw.is_admin, function(req, res, next) {
    session_store = req.session;

    User.find({}, function(err, user){
        console.log(user);
        res.render('users/index', { session_store:session_store, users: user });
    }).select('username email firstname lastname admin createdAt updatedAt');
});                         

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
