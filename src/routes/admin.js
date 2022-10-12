const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/join');
});

router.post('/', async (req, res) => {
  if (req.body.adminPasscode === 'admin') {
    // make user an admin
    req.user.isAdmin = true;
    await req.user.save();
    res.redirect('/join');
  } else {
    res.redirect('/join');
  }
});

module.exports = router;
