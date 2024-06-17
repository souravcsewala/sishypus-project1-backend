const UserModel = require("../models/userModel");
const ErrorHandeler = require("../special/errorHandelar");
const crypto = require("crypto");
const sendToken=require("../special/jwtToken")

// 1. User register 
const UserRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(new ErrorHandeler("Please provide all details", 401));
    }
    const user = await UserModel.create({
      name,
      email,
      password
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user
    });
  } catch (error) {
    next(error);
    console.log("Error from UserRegister", error);
  }
};

const UserLogin=async(req,res,next)=>{
    try{
             const {email,password}=req.body;
                if(!email || !password){
                    return  next(new ErrorHandeler("plz provide email and password",404))
                }
                  const user= await UserModel.findOne({email:email}).select("+password");
                       if(!user){
                          return next( new ErrorHandeler("invalid email or password",404))
                       }
                           const isPasswordMatch= await user.ComparePassword(password);

                               if(!isPasswordMatch){
                                   return next(new ErrorHandeler("plz provide email or password correctly",404))
                               }
                               sendToken(user,201,res);
                              
                       
    }catch(error){
         next(error)
         console.log("error from user login ",error)
    }
}

        //3. user logout 
        const userLogout=async(req,res,next)=>{
            try{
                 res.cookie("token",null,{
                   expires: new Date(Date.now()),
                   httpOnly: true,
                 })
                 res.status(200).json({
                   success: true,
                   message: "Logged Out",
                 });
            }catch(error){
                  console.log("this error from logout ",error)
                      next(error)
            }
     }











module.exports = { UserRegister ,UserLogin,userLogout};
