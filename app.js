const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { expressjwt } = require('express-jwt');
const md5 = require('md5');
const {
  ForbiddenError,
  ServiceError,
  UnknownError,
} = require('./utils/errors');

// 设置环境变量。默认读取根目录下的.env环境变量
require('dotenv').config();
// 引入数据sequelize，并建立连接
require('./db/db');

const loginRouter = require('./routes/admin');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  expressjwt({
    secret: md5(process.env.JWT_SECRET),
    algorithms: ['HS256'],
  }).unless({
    path: [{ url: '/api/admin/login', methods: ['POST'] }],
  })
);

app.use('/api/admin', loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.send(new ForbiddenError('未登录，或者登录已经过期').toResponseJSON());
  } else if (err instanceof ServiceError) {
    res.send(err.toResponseJSON());
  } else {
    res.send(new UnknownError().toResponseJSON());
  }
});

module.exports = app;
