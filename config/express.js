var express=require('express');
var createError = require('http-errors');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
// var multer			= require('multer');

module.exports  =function(){
    console.log('init expesss...');
    var app = express();
    // view engine setup
    //加入json解析中间件
    //for parsing application/json
    app.use(bodyParser.json());
    //for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({extended:true}));
    //for parsing multipart/form-data //需要用npm install multer@0.1.8
    // app.use(multer());
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'jade');
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(sassMiddleware({
        src: path.join(__dirname, '../public'),
        dest: path.join(__dirname, '../public'),
        indentedSyntax: true, // true = .sass and false = .scss
        sourceMap: true
    }));
    app.use(express.static(path.join(__dirname, '../public')));
    //设置跨域访问
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });
    //路由
    var indexRouter = require('../app/routes/index');
    var usersRouter = require('../app/routes/users');
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    require('../app/routes/news.server.routes')(app);
    // 处理所有未知的请求
    app.use(function(req, res, next) {
        next(createError(404));
    });

    // 统一处理出错的情况
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development.js
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development.js' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

    return app;
};