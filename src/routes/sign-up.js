const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
  res.render('sign-up', { title: 'Sign Up' });
});

router.post(
  '/',
  // I validate here for practice
  // validate and sanitize fields (server side)
  // trim() to delete any whitespace
  // escape() to remove HTML characters from the variable that might be used in JavaScript cross-site scripting attacks.
  body('firstName', 'First Name must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('lastName', 'Last Name must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('username', 'Username must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('email', 'E-mail must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .isEmail()
    .withMessage('Provide proper email form ex. abc@domain.com')
    .escape(),
  body('password', 'Password must not be empty.').isLength({ min: 1 }),
  body(
    'confirmPassword',
    'Confirm Password is not equal to Password field'
  ).custom((value, { req }) => value === req.body.password),
  async (req, res, next) => {
    // returns errors if there were any during validation
    const errors = validationResult(req);
    // isEmpty is checking if array is empty inside
    // isEmpty([{0:false},"",0]) == true
    if (!errors.isEmpty()) {
      return res.status(400).render('sign-up', {
        title: 'Sign Up Error',
        errors: errors.array(),
        // pass the user so we don't need to rewrite the values
        user: req.body,
      });
      // return res.status(400).send(errors.array());
    } else {
      // create user
      try {
        // change password to a hashed one
        req.body.password = await bcrypt.hash(req.body.password, 10);
        // create user with hashed
        await User.create(req.body);
        res.render('information', {
          title: 'Sign up successful',
          information: 'You can now login',
        });
      } catch (error) {
        res.status(500).send('Internal error', error.message);
        next(error);
      }
    }
  }
);

module.exports = router;
