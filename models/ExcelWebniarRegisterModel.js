const { Schema, model } = require("mongoose");
const validator = require("validator");
const ExcelWebniarRegisterSchema = new Schema({
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
  selectcourse: {
    type: String,
    required: [true, "please choose topic"],
    enum: ["Basic Excel", "Advanced Excel"],
  },
  occupation: {
    type: String,
    required: [true, "please enter your occupation"],
  },
  address: {
    type: String,
    required: [true, "please enter your  address"],
  },
  seen:{
    type: Boolean,
    default: false
  }
});

const ExcelWebniarRegisterModel = new model(
  "excelwebniarregister",
  ExcelWebniarRegisterSchema
);

module.exports = ExcelWebniarRegisterModel;
