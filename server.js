const express = require('express');
const app = express();
const db = require('./database')
const path = require('path');
const pg = require('pg');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const favicon = require('serve-favicon');

const homeRouter = require('./routes/home.routes');
const adminRouter = require('./routes/admin.routes');
const userRouter = require('./routes/user.routes');
const companyRouter = require('./routes/company.routes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/static/pikaday/pikaday.js', express.static('./node_modules/pikaday/pikaday.js'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    store: new pgSession({pool: db.pool}),
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 604800000}
}));


app.use('/', homeRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/company', companyRouter);

app.listen(process.env.PORT || 3000, () => console.log("listening at 3000"));
