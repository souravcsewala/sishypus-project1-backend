
    
    const errorMiddliware=(err,req,res,next)=>{
            
        err.message=err.message || "server internal problem";
        err.statuscode=err.statuscode || 500;
        res.status(err.statuscode).json({
          success: false,
          message: err.message,
          statuscode:err.statuscode
        });

          next()
          }

 module.exports=errorMiddliware