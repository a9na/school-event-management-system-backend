const express = require('express');
const Feedback = require('../models/Feedback');
const router = express.Router();

// Submit feedback
router.post('/', async (req, res) => {
  const feedback = new Feedback({
    event: req.body.eventId,
    user: req.body.userId,
    content: req.body.content
  });
  try {
    const newFeedback = await feedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
