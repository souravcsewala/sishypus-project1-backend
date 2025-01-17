const mongoose = require("mongoose");
const validator = require("validator");
const ConsultancySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
   
  },
  email: {
    type: String,
    required: [true, "please enter your mail id"],
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
    validate: [validator.isEmail, "plz enter valid mail id"],
  },
 
  phone: {
    type: String,
    required: [true, "please enter your phone number"],
    minLength: [
      10,
      "Phone number must include country code and be at least 10 digits",
    ],
   
  },
  subject: {
    type: String,
    required: [true, "please choose topic"],
   
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
