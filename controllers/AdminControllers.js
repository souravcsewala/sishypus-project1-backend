
    const UserModel=require("../models/userModel");

    const ContactModel=require("../models/contactModel");
    const ErrorHandeler = require("../special/errorHandelar");
     const WhiteCardModel=require("../models/CardModel") 
     const cloudinary = require("cloudinary");

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
                       
                  // 6. update user by admin -- admin power 
                       const UpdateUser=async(req,res,next)=>{
                                try{
                                    const {newName,newEmail,newRole}=req.body;
                                    const newUpdateByAdmin={
                                          name:newName,
                                          email:newEmail,
                                          role:newRole
                                    }
                                                  const UpdateUser= await UserModel.findByIdAndUpdate(req.params.id, newUpdateByAdmin,{
                                                    new:true,
                                                    runValidators:true,
                                                    useFindAndModify:false
                                                 })
                                                     if(!UpdateUser){
                                                        return next(new ErrorHandeler(" updated fail",404))
                                                     }
                                                      res.status(200).json({
                                                         message:"user update succesfully",
                                                         success:true,
                                                           UpdateUser
           
                                                      })
                                }catch(error){
                                      console.log(`the error from update user by admin ${error}`)
                                         next(error)
                                }
                       }
                           // 7. create white card by admin -- admin power 
                              const CreateCard=async(req,res,next)=>{
                                     try{
                                        console.log('Request Body:', req.body); 
                                        if (!req.files || !req.files.pdfFile) {
                                            return next(new ErrorHandeler("Please upload a PDF file",401));
                                          }
                                        const file = req.files.pdfFile;
                                        console.log("req.files.pdfFile",file);
                                        const filePath = file.tempFilePath;
                                        console.log("tempFilePath",filePath);
                                        if (!filePath) {
                                            return next(new Error("Temporary file path is missing or invalid"));
                                          }
                                        const myCloud = await cloudinary.v2.uploader.upload(filePath, {
                                          folder: "pdf", 
                                          resource_type: 'auto', 
                                        });
                                               console.log("myCloud",myCloud)
                                          const { title,readTime,tagName} =req.body;
                                          if(!title || ! readTime || ! tagName){
                                                return next(new ErrorHandeler("plz provide all details",401))
                                          }
                                          const CreateCard= await WhiteCardModel.create({
                                            title,
                                            readTime,
                                            tagName,
                                            pdfFile:{
                                              public_id:file.name,
                                              url:  myCloud.secure_url
                                            }
                                       })
                                          res.status(201).send({
                                             success:true,
                                             message:"new card created",
                                             CreateCard
                                          })
                                     }catch(error){  
                                        console.error(error)
                                            next(error)
                                     }
                              }
                 // 8. update white card by admin -- admin power 
                 
                 const UpdateCard = async (req, res, next) => {
                    try {
                      const { Newtitle, NewreadTime, NewtagName } = req.body;
                  
                      const newdata = {
                        title: Newtitle,
                        readTime: NewreadTime,
                        tagName: NewtagName
                      };
                  
                     
                      const existingCard = await WhiteCardModel.findById(req.params.id);
                      if (!existingCard) {
                        return next(new ErrorHandeler("Card not found", 404));
                      }
                  
                     
                      if (req.files && req.files.pdfFile) {
                        const file = req.files.pdfFile;
                        console.log("req.files.pdfFile", file);
                  
                       
                        const filePath = file.tempFilePath;
                        console.log("tempFilePath", filePath);
                  
                        if (!filePath) {
                          return next(new Error("Temporary file path is missing or invalid"));
                        }
                  
                       
                        if (existingCard.pdfFile && existingCard.pdfFile.public_id) {
                          await cloudinary.v2.uploader.destroy(existingCard.pdfFile.public_id, { resource_type: 'auto' });
                        }
                  
                                         
                  
                        
                        const myCloud = await cloudinary.v2.uploader.upload(filePath, {
                          folder: "pdf",
                          resource_type: 'auto',
                         
                        });
                        console.log("myCloud", myCloud);
                  
                        newdata.pdfFile = {
                          public_id: file.name,
                          url: myCloud.secure_url,
                        };
                      }
                  
                     const updateCard = await WhiteCardModel.findByIdAndUpdate(req.params.id, newdata, {
                        new: true,
                        runValidators: true,
                        useFindAndModify: false,
                      });
                  
                      if (!updateCard) {
                        return next(new ErrorHandeler("Card not updated", 401));
                      }
                  
                      res.status(200).json({
                        success: true,
                        message: "Card updated successfully",
                        updateCard
                      });
                    } catch (error) {
                      console.error("the error from update card by admin", error);
                      next(error);
                    }
                  };
                  // 9. delete a card byadmin --admin power 

                   const CardDelete=async(req,res,next)=>{
                         try{
                            const card=await WhiteCardModel.findByIdAndRemove(req.params.id);
                                 if(!card){
                                    return next(new ErrorHandeler("Card not found",404));
                                 }
                                    await WhiteCardModel.deleteOne({_id:req.params.id})
                                    res.status(200).json({
                                        success:true,
                                        message:"card delete successfully",
                                        totalcard:await WhiteCardModel.countDocuments()
                                   })   
                         }catch(error){
                              console.log("error from delete a card",error)
                                next(error)
                         }
                   }

    module.exports = {UserDetailsAll,
                     AllMessagefromUser,
                     GetInstructorDetails,
                     UpdateInstructor,
                     RemoveInstructor,
                    UpdateUser,
                    CreateCard,
                    UpdateCard ,
                    CardDelete};
    
        