const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  location: String,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }]
});

module.exports = mongoose.model('Event', eventSchema);
