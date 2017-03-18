var express = require('express');
var crypto = require('crypto');
var User = require('../models/user');
var Auth_mdw = require('../middlewares/auth');

var router = express.Router();
var secret = 'achmadfatkharrofiqi';
var session_store;

router.get('/',Auth_mdw.check_login, function(req,res,next){
  session_store = req.session;
  res.render('index', {
    title: 'Achmad Fatkharrofiqi Express.js Blog Series', session_store:session_store
  });
});

router.get('/login',function(req,res,next){
  res.render('login');
});

router.post('/login', function(req,res,next){
  session_store = req.session;
  var password = crypto.createHmac('sha256', secret)
                    .update(req.param('password'))
                    .digest('hex');
  if (req.param('username') == "" || req.param('password') == ""){
    req.flash('info', 'Maaf, tidak boleh ada field yang kosong!');
    res.redirect('/login');
  }else{
    User.find({username: req.param('username'),password:password}, function(err,user){
      if(err) throw err;
      if(user.length > 0){
        session_store.username = user[0].username;
        session_store.email = user[0].email;
        session_store.admin = user[0].admin;
        session_store.logged_in = true;

        res.redirect('/');
      }else{
        req.flash('info', 'Maaf, akun anda tidak ditemukan!');
        res.redirect('/login');
      }
    });
  }                    
});

router.get('/logout', function(req, res, next){
  req.session.destroy(function(err){
    if(err){
      console.log(err);
    }else{
      res.redirect('/login');
    }
  });
});

module.exports = router;
