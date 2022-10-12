const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/join');
});

router.post('/', async (req, res) => {
  // if the password is correct and user is logged in
  if (req.body.adminPasscode === 'admin' && req.user) {
    // make user an admin
    req.user.isAdmin = true;
    await req.user.save();
    res.render('information', {
      title: 'Correct',
      information: 'You are an Admin now!',
    });
  } else {
    res.render('join', {
      title: 'Wrong passcode',
      adminMessage: 'Wrong passcode',
    });
  }
});

module.exports = router;
