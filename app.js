var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session")
const MongoStore = require('connect-mongo')
const cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));  // 处理日志 
// 处理 post 请求
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 处理 cookie 
app.use(cookieParser());
// 处理静态资源
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({credentials:true,origin:true}))

// 处理 session
app.use(session({
  name: "bilibili",
  secret: "this is session ",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
  },
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    // 新创建一个 数据库  bili_session
    mongoUrl: 'mongodb://127.0.0.1:27017/bili_session',
    ttl: 1000 * 60 * 10 // 过期时间
  }),
}))

//  应用级别中间件 -- session 过期校验
app.use(function (req, res, next) {
  // 排除 login 相关的路由和接口
  if (req.url.includes('login')) {
    next()
    return
  }
  // session 存在的时候
  if (req.session.user) {
    // 重新设置一下 session --> resave --> 搭配才能让 session 在访问中，延长 session 过期时间
    req.session.mydate = Date.now()
    next()
  } else {
    // res.redirect('/login')  // ajax 发起的， redirect 是不生效的，返回的是一个页面
    // 区分是 路由 还是 接口
    // 接口返回错误码   不是接口就重定向 send / json
    req.url.includes('api') ? res.status(401).send({ success: false }) :
      res.redirect('/login')
  }
})

app.use('/', indexRouter);
app.use('/api', usersRouter)
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;







