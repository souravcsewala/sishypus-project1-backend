// Updated Event Schema
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, "Please provide an image URL"],
  },
  title: {
    type: String,
    required: [true, "Please enter the event title"],
  },
  description: {
    type: String,
    required: [true, "Please enter the event description"],
  },
  location: {
    type: String,
    required: [true, "Please provide the event location URL"],
  },
  eventDate: {
    type: Date, 
    required: [true, "Please enter the event date"],
  },
  time: {
    type: String,
    required: [true, "Please enter the event time"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Event', eventSchema);
