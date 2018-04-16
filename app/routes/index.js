var express = require('express');
var multipart = require('connect-multiparty');

var multipartMiddleware = multipart();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//测试www-form-urlencoded
router.post('/urlencoded', function(req, res){
    console.log(req.body);
    res.send(" post successfully!");
});
//测试form-data
router.post('/formdata',multipartMiddleware, function (req, res) {
    console.log(req.body);
    res.send("post successfully!");
});

module.exports = router;
