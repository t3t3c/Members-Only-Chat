const express = require('express');
const router = express.Router();
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../models/user');

router.get('/', (req, res) => {
  res.render('login', { title: 'Login', user: req.user });
});

router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

module.exports = router;
