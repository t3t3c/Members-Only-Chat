const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

router.get('/', (req, res) => {
  res.render('join', { title: 'Join the club!' });
});

router.post('/', body('passcode').escape(), async (req, res, next) => {
  if (req.body.passcode === 'code') {
    req.user.isMember = true;
    await req.user.save();
  }
  res.redirect('/join');
});

module.exports = router;
