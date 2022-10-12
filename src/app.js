const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const User = require('./models/user');
const bcrypt = require('bcryptjs');

require('dotenv').config();

// mongoDB

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to database'))
  .catch((error) => console.log('Database connection error: ', error.message));

// express

const app = express();
// setup view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// setup body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// make public folder public
app.use(express.static(path.join(__dirname, 'public')));

// authentication

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // password match - log user in
          return done(null, user);
        } else {
          // passwords don't match
          return done(null, false, { message: 'Incorrect password' });
        }
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//  express-session is not used directly, it is a dependency that is used in the background by passport.js.
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// middleware

// makes req.user availible eveythere through currentUser variable
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// routes

const homeRoute = require('./routes/home');
app.use('/', homeRoute);

const signUpRoute = require('./routes/sign-up');
app.use('/sign-up', signUpRoute);

const loginRoute = require('./routes/login');
app.use('/login', loginRoute);

const logOutRoute = require('./routes/log-out');
app.use('/log-out', logOutRoute);

const joinRoute = require('./routes/join');
app.use('/join', joinRoute);

const newMessageRoute = require('./routes/new-message');
app.use('/new-message', newMessageRoute);

const adminRouter = require('./routes/admin');
app.use('/admin', adminRouter);

const messageRouter = require('./routes/message');
app.use('/message', messageRouter);

// 404
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

app.use(logger('dev'));

// start listening
// process.env.PORT is for heroku
app.listen(process.env.PORT || 5000, () =>
  console.log('App listening on port 3000')
);
