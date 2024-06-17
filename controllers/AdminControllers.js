
    const UserModel=require("../models/userModel");

    const ContactModel=require("../models/contactModel");
    const ErrorHandeler = require("../special/errorHandelar");
      

    //1. get user details -- admin power
     
    const UserDetailsAll = async (req, res, next) => {
        try {
            const users = await UserModel.find({});
            if (!users || users.length === 0) {
                return next(new ErrorHandeler("Please provide all details", 401));
            }
            res.status(200).json({
                 success:true,
                 message:"there is all user list" ,
                 users
            })
        } catch (error) {
            console.error(`Error from get user details in admin panel: ${error}`);
            next(error);
        }
    };
         // 2. get all messages -- admin power
        const AllMessagefromUser=async(req,res,next)=>{
                 try{
                       const GetMessages= await ContactModel.find({});
                         if(!GetMessages || GetMessages.length === 0){
                            return next(new ErrorHandeler("there is no any message", 401));
                        }
                          res.status(200).json({
                              success:true,
                              message:"there is all message list",
                              GetMessages
                          })
                 }catch(error){
                      console.log(`the error from get AllMessagefromUser: ${error}`)
                        next(error)
                 }
        }
    
      // 3. get instructor details -- admin power 

               const GetInstructorDetails=async(req,res,next)=>{
                      try{
                        const instructors=await UserModel.find({role:"instructor"});
                             if(!instructors || instructors.length === 0){
                                  return next(new ErrorHandeler("there is no is instructors now",401))
                             }
                             res.status(200).json({
                                success:true,
                                message:"there is all instructor list",
                                instructors,
                                totalinstructors:instructors.length
                             })
                      }catch(error){
                           console.error(`get instructor details ${error}`)
                            next(error)
                      }


                      
               }

                    //4. update instructors by admin -- admin power

                        const UpdateInstructor=async(req,res,next)=>{
                            try{
                                const {newName,newEmail,newRole}=req.body;
                                  const newUpdateByAdmin={
                                        name:newName,
                                        email:newEmail,
                                        role:newRole
                                  }
                                      const UpdateInstructorAdmin= await UserModel.findByIdAndUpdate(req.params.id, newUpdateByAdmin,{
                                         new:true,
                                         runValidators:true,
                                         useFindAndModify:false
                                      })
                                          if(!UpdateInstructorAdmin){
                                             return next(new ErrorHandeler(" updated fail",404))
                                          }
                                           res.status(200).json({
                                              message:"heey admin instructor update succesfully",
                                              success:true,
                                              UpdateInstructorAdmin

                                           })
                        }catch(error){
                               console.log(`this error from user update by admin ${error}`)
                                 next(error)


                        }
                }
                           
                // 5. delete instructor by admin -- admin power

                          const RemoveInstructor=async (req,res,next)=>{
                                     try{
                                            
                                        const findInstructor= await UserModel.findById(req.params.id);
                                               if(!findInstructor){
                                                   return next(new ErrorHandeler("oops! instructor not found",404))
                                               }
                                               const userDelete=  await UserModel.deleteOne({_id:req.params.id});
                                            //    const instructorsNumber=await UserModel.find({role:"instructor"});
                                            const instructorCount = await UserModel.countDocuments({ role: "instructor" });
                                               res.status(200).json({
                                                message:"instructor delete succesfully",
                                                userDelete,
                                                Numberofinstructor:instructorCount
                                             
                                               })
                                     }catch(error){
                                          console.log(`the error from RemoveInstructor ${error}`)
                                          next(error)
                                     }
                          }
                    
    module.exports = {UserDetailsAll,
                     AllMessagefromUser,
                     GetInstructorDetails,
                     UpdateInstructor,
                     RemoveInstructor};
    
        