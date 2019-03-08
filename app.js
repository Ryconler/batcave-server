const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'http://batcave.jessezhu.cn' : 'http://localhost:8080',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'Ryconler',
    resave: false,
    saveUninitialized: true,
    cookie : {
        maxAge : 1000 * 60 * 30, // 设置 session 的有效时间，单位毫秒
    }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(require('./middlewines/auth'))
app.use('/api', apiRouter);

module.exports = app;
