const express = require('express');
const router = express.Router();
const Message = require('../models/message');

function formatMessage(messageObject) {
  return messageObject.toLocaleString();
}

router.get('/', async (req, res) => {
  const allMessages = await Message.find()
    .populate('author')
    .sort({ timestamp: -1 });
  res.render('home', { title: 'Home Page', allMessages, formatMessage });
});

module.exports = router;
