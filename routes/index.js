var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Achmad Fatkharrofiqi' });
});

router.get('/demo1', function(req, res, next){
  res.render('demo1',{
    message: 'Lorem ipsum sit dolot amet',
    user: {name: 'Achmad', email: 'achmadfatkharrofiqi404@gmail.com', website: 'http://readme.my.id'}
  });
});

router.get('/demo2/(:id)/(:category)', function(req,res,next){
  res.render('demo2',{
    id: req.params.id,
    category: req.params.category
  });
});

router.get('/demo3',function(req,res,next){
  res.json({
    message: 'Lorem ipsum sit dolot amet',
    user: {name: 'Achmad', email: 'achmadfatkharrofiqi404@gmail.com', website: 'http://readme.my.id'}
  });
});

router.get('/demo4',function(req,res,next){
  res.render('demo4')
});

router.post('/demo4/',function(req,res,next){
  res.json({
    message: "request POST is executed",
    data: {
      username: req.param('username'),
      email: req.param('email'),
      website: req.param('website'),
      phone: req.param('phone')
    }
  });
});

router.put('/demo5/', function(req,res,next){
  res.json({
    message: "request PUT is executed",
    data: {
      username: req.param('username'),
      email: req.param('email'),
      website: req.param('website'),
      phone: req.param('phone')
    }
  })
});

router.delete('/demo6/',function(req,res,next){
  res.json({
    message: "request DELETE is executed"
  });
});

router.get('/demo7',function(req,res,next){
  res.redirect('/demo7_result');
}); 

router.get('/demo7_result',function(req,res,next){
  res.render('demo7');
});
module.exports = router;
