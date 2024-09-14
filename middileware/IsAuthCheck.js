
   
     const ErrorHandelar=require("../special/errorHandelar");    

     const JWt=require("jsonwebtoken");
       const User=require("../models/userModel")

       const isAuthCheak=async(req,res,next)=>{
               try{
                     const {token}=req.cookies;
                         if(!token){
                              return next(new ErrorHandelar("To Access this site , please first login",404))
                         }
                          const decodeToken= JWt.verify(token,process.env.JWT_SECRET)
                              req.user= await User.findById(decodeToken._id);
                               req.userid=req.user._id;
                               req.userName=req.user.name;
                                  console.log("req.userid:",req.user._id)

                                next();
               }catch(error){
                    console.log(`the error from isAuthCheak ${error}`);
                    
               }
       }

          module.exports={isAuthCheak}
