const UserModel = require("../models/userModel");
const cloudinary=require("cloudinary");
const ErrorHandeler = require("../special/errorHandelar");

const sendToken = require("../special/jwtToken");

//! 1. User register
const UserRegister = async (req, res, next) => {
  try {
    // Handle profile image upload if it exists
    let profileImage = {};
    if (req.files && req.files.profileimage) {
      const myCloud = await cloudinary.v2.uploader.upload(req.files.profileimage.tempFilePath, {
        folder: "supplyProvisionProfile",
        width: 150,
        crop: "scale",
      });
      profileImage = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
      };
    }

    // Destructure other data from request body
    const { name, email, password, role, facultysubject, phone } = req.body;

    // Ensure required fields are provided
    if (!name || !email || !password || !phone) {
      return next(new ErrorHandeler("Please provide all details", 401));
    }

    // Create new user
    const user = await UserModel.create({
      name,
      email,
      password,
      role,
      facultysubject,
      phone,
      profileimage: profileImage
    });

    // Send response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    
    next(error);
    console.log("Error from UserRegister", error);
  }
};

 


   

//*2.  login -- admin,user,instructor
const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandeler("Please provide email and password", 400));
    }

    const user = await UserModel.findOne({ email }).select("+password");
    
    if (!user) {
      return next(new ErrorHandeler("Invalid email or password", 401));
    }

    const isPasswordMatch = await user.ComparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandelar("Invalid email or password", 404));
    }

    
    sendToken(user, 200, res);
    
  } catch (error) {
    console.log("Error from admin login", error);
    next(error);
  }
};

//?3. logout -- user,admin,student,
const Logout = async (req, res, next) => {
  try {
  
    res.status(200).json({
      success: true,
      message: " Logged Out",
    });
  } catch (error) {
    console.log("Error from admin logout", error);
    next(error);
  }
};

//* student login 
const StudentLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandeler("Please provide email and password", 400));
    }

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandeler("Invalid email or password", 401));
    }

    const isPasswordMatch = await user.ComparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandeler("Invalid email or password", 401));
    }

    
    if (user.role === "student") {
      if (!user.isVerified) {
        return res.status(403).json({
          success: false,
          message: "You are not approved by the admin. Please wait for approval.",
        });
      } }

    
    sendToken(user, 200, res);
  } catch (error) {
    console.log("Error from admin login", error);
    next(error);
  }
};


module.exports = { UserRegister,Logout,Login ,StudentLogin};
