        const ErrorHandeler=require("../special/errorHandelar")
    
    const errorMiddliware=(err,req,res,next)=>{
            
        err.message=err.message || "server internal problem";
        err.statuscode=err.statuscode || 500;
   
             // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandeler(message, 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandeler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandeler(message, 400);
  }    
         // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandeler(message, 400);
  }


        res.status(err.statuscode).json({
          success: false,
          message: err.message,
          statuscode:err.statuscode
        });

          next()
          }

 module.exports=errorMiddliware