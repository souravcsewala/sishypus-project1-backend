const validator = require("validator");
const { Schema, model } = require("mongoose");

const contactschema = new Schema({
  firstname: {
    type: String,
    required: [true, " first name is required plz provide it"],
  },
  lastname: {
    type: String,
    required: [true, " Last name is required plz provide it"],
  },
  company: {
    type: String,
    required: [true, " company name is required plz provide it"],
  },
  email: {
    type: String,
    required: [true, "mail id is required plz provide it"],
    validate: [validator.isEmail, "plz enter valid mail id"],
  },
  phone: {
    type: Number,
    required: [true, "phone number is required plz provide it"],
  },
  message: {
    type: String,
    required: [true, "plz type message"],
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
// create model
const Contact = new model("Contact", contactschema);

module.exports = Contact;
