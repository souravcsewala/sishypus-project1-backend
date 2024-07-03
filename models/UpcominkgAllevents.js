
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true,"plz enter the title of event"]
  },
  eventDate: {
    day: {
      type: Number,
      required: [true,"plz enter the day of event"]
    },
    month: {
      type: String,
      required: [true,"plz enter the month of event"]
    },
    year: {
      type: Number,
      required: [true,"plz enter the year of event"]
    },
  },
  description: {
    type: String,
    required: [true,"plz enter the description of event"]
  },
  location: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
