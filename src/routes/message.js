const express = require('express');
const router = express.Router();
const Message = require('../models/message');

router.post('/:id/delete', async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (error) {
    res.render('information', {
      title: 'Delete not successful',
      information: 'Delete not successful',
    });
  }
});

module.exports = router;
