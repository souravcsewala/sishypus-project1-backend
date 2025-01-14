const mongoose = require("mongoose");
const validator = require("validator");
const ConsultancySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "please enter your mail id"],
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
    validate: [validator.isEmail, "plz enter valid mail id"],
  },
  countryCode: {
    type: String,
    required: [false, "Please select your country code"],
    match: [/^\+\d{1,3}$/, "Please enter a valid country code"],
  },
  phone: {
    type: String,
    required: [true, "please enter your phone number"],
    minLength: [
      11,
      "Phone number must include country code and be at least 11 digits",
    ],
    maxLength: [15, "Phone number cannot exceed 15 digits"],
  },
  subject: {
    type: String,
    required: [true, "please choose topic"],
    enum: ["course related", "fees related", "any query"],
  },
  message: {
    type: String,
    required: [true, "please enter your  message"],
  },
  seen:{
    type:Boolean,
    default:false
  },
  createdAt: {
    type: Date,
    default: Date.now,  
  },

},
{ timestamps: true }

);

const ConsultancyModel = mongoose.model("free consulnt", ConsultancySchema);

module.exports = ConsultancyModel;
