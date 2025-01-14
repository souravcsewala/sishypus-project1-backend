const { model, Schema } = require("mongoose");

// Sub-schema for a class
const ClassSchema = new Schema({
  title: {
    type: String,
   
  },
  description: {
    type: String,
  
  },
  classJoinLink: {
    type: String,
  
  },
  classType: {
    type: String,
    required: true,
    enum: ["upcoming", "recorded"],
  },
  NotesUrl: {
    type: String,
    
  },
  RecordVideoUrl: {
    type: String,
   
  },
  date: {
    type: Date,

  },
  time: {
    type: String,

  },
});

// Main Course Schema
const CourseSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please enter the course title"],
  },
  image: {
    type: String,
    default:
      "https://cdn3.vectorstock.com/i/1000x1000/76/47/online-course-concept-vector-26477647.jpg",
  },
  description: {
    type: String,
    required: [true, "Please enter the course description"],
  },
  aboutFaculty: [
    {
      name: {
        type: String,
        required: [true, "Please enter the faculty name"],
      },
      email: {
        type: String,
        required: [true, "Please enter the faculty email"],
        validate: {
          validator: function (value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); 
          },
          message: "Please provide a valid email address",
        },
      },
      phone: {
        type: String,
        validate: {
          validator: function (value) {
            return /^\d{10}$/.test(value); 
          },
          message: "Please provide a valid phone number",
        },
      },
    },
  ],
  prerequisites: [String],
  totalclass: {
    type: Number,
    required: [true, "Please enter the total classes for the course"],
    default: 15,
  },
  weeklyclass: {
    type: Number,
    required: [true, "Please enter the weekly classes for the course"],
    default: 2,
  },
  duration: {
    type: Number,
    required: [true, "Please enter the duration of the course"],
  },
  discount: {
    type: Number,
    required: [true, "Please enter the discount price of the course"],
  },
  price: {
    type: Number,
    required: [true, "Please enter the price of the course"],
  },
  typeofcourse: {
    type: String,
    required: [true, "Please enter the type of the course"],
    enum: ["excel", "german language"],
  },
  RunningStatus: {
    type: String,
    enum: ["paused", "running", "expired"],
    default: "paused",
  },
  classes: [ClassSchema], // Classes associated with the course
});

const CourseModel = model("Course", CourseSchema);

module.exports = CourseModel;
