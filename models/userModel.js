const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required plz provide it"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "mail id is required plz provide it"],
    unique: true,
    validate: [validator.isEmail, "plz enter valid mail id"],
  },
  phone: {
    type: String,
    required: [true, "please enter your valid phone number"],
    maxLength: [14, "Invalid phone number"],
    minLength: [10, "Invalid phone number"],
    unique: true,
    validate: {
      validator: (val) => {
        const phoneNumberValidationRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        return phoneNumberValidationRegex.test(val);
      },
      message: "Please enter a valid phone number",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  facultysubject: {
    type: String,
    default: "none",
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  Buycourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  profileimage: 
    {
      public_id: {
        type: String,
     
      },
      url: {
        type: String,
       
      },
    },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: String,
  },
});

//? hashing password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//? jwt token
UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//? compare password
UserSchema.methods.ComparePassword = async function (password) {
  if (!this.password) {
    console.log("Password is undefined for user:", this);
    return false;
  }
  console.log("this:", this);
  return bcrypt.compare(password, this.password);
};

//? reset password token
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; //* valid 10 minutes

  return resetToken;
};

const UserModel = new mongoose.model("user", UserSchema);

module.exports = UserModel;
