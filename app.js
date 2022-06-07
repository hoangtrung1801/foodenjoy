var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index.route');
var createBlogRouter = require('./routes/create-blog.route');
var recipeRouter = require('./routes/recipe.route');
var tipRouter = require('./routes/tip.route');
var validate = require('./validate/validate.js');
var searchRouter = require('./routes/search.route');
var dacSanRouter = require('./routes/dac-san.route');
var emailRouter = require('./routes/email.route');
var newsRouter = require('./routes/news.route');

var userMiddleware = require('./middlewares/user.middleware');
var popularPostMiddleware = require('./middlewares/popular-post.middleware');

var app = express();
var db = require('./db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use(userMiddleware);
app.use(popularPostMiddleware);

//
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// get page
app.use('/', indexRouter);
app.use('/create-blog', createBlogRouter);
app.use('/recipe', recipeRouter);
app.use('/tip', tipRouter);
app.use('/search', searchRouter);
app.use('/dac-san', dacSanRouter);
app.use('/email', emailRouter);
app.use('/news', newsRouter);

app.use('/', validate);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
