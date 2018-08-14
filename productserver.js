var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
var logger = require('morgan');

var $IF = require('./config');
var loginRouter = require('./routes/login');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var producttypeRouter = require('./routes/producttype');
var productRouter = require('./routes/product');
var tagRouter = require('./routes/tag');
var uploadRouter = require('./routes/upload');

var app = express();
app.listen($IF.port);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

 /**
 * 使用connect-multiparty中间件处理表单
 * 文件上传前端form标签里做这样的标识enctype="multipart/form-data"
 * upload.js文件已经使用multer中间件处理文件上传
 * 使用connect-multiparty中间件的时候需要在指定的路由使用
 * 不能全局使用，会跟multer造成冲突
 * connect-multiparty缺点，上传大文件的时间需要比较长，在uploadjs文件里有验证解释
 * var multiparty = require('connect-multiparty');
 * var multipartMiddleware = multiparty();
 * app.use(multipartMiddleware);
 * app.use(multiparty({uploadDir:'./uploads' }));//设置上传文件存放的地址。
 */ 

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }))
// // parse application/json
// app.use(bodyParser.json())


app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.bodyParser({uploadDir:'./uploads'}));

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
  else  next();
});


app.use('*', loginRouter);
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/producttype', producttypeRouter);
app.use('/product', productRouter);
app.use('/tag', tagRouter);
app.use('/upload', uploadRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
