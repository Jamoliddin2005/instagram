const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require("express-handlebars");
const session = require('express-session')
const passport = require('passport')


const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const app = express();


require('./helper/db')()


app.use(require('connect-flash')())
app.use(function(req, res, next) {
    res.locals.messages = require('express-messages')(req, res)
    next()
})


app.use(session({
    secret: "SecretKey",
    resave: true,
    saveUninitialized: false
}))


app.engine(
    ".hbs",
    exphbs({
        extname: ".hbs",
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    })
);
app.set("view engine", ".hbs");

require('./middleware/passport')(passport)



app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req, res, next) => {
    res.locals.user = req.user || null
    next()
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler


// app.use(function(req, res, next) {
//     next(createError(404));
// });

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