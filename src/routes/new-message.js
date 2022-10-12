const express = require('express');
const router = express.Router();
const Message = require('../models/message');

router.get('/', (req, res) => {
  res.render('new-message', { title: 'New Message' });
});

router.post('/', async (req, res) => {
  if (req.user) {
    // set current user as author
    req.body.author = req.user.id;
    // create new message based on the body
    await Message.create(req.body);
    res.redirect('/new-message');
  } else {
    console.log('not logged in');
    res.redirect('/new-message');
  }
});

module.exports = router;
