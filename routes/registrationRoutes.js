const express = require('express');
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const User = require('../models/User');
const router = express.Router();
const nodemailer = require('nodemailer');

// Register for an event
router.post('/', async (req, res) => {
  const registration = new Registration({
    event: req.body.eventId,
    user: req.body.userId
  });
  try {
    const newRegistration = await registration.save();

    const event = await Event.findById(req.body.eventId);
    const user = await User.findById(req.body.userId);
    event.participants.push(user);
    user.registeredEvents.push(event);
    await event.save();
    await user.save();

    // Send email notification
    sendEmail(user.email, 'Event Registration', `You have successfully registered for the event: ${event.title}`);

    res.status(201).json(newRegistration);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
}

module.exports = router;
