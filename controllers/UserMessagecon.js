
   const ContactModel=require("../models/contactModel");
   const ErrorHandeler = require("../special/errorHandelar");

      //1. send message 

         const SendMessage=async(req,res,next)=>{
                 try{
                    const { Firstname,  Lastname,email,  company, phone, message} = req.body;
                    if (!Firstname || !Lastname || !email || !company || ! phone || !message) {
                      return next(new ErrorHandeler("Please provide all details", 401));
                    }
                    const Message = await ContactModel.create({
                        Firstname,
                          Lastname,
                          email,  
                          company,
                           phone,
                         message
                      });
                      res.status(201).json({
                        success: true,
                        message: "Message send  successfully",
                        Message
                      });
                 }catch(error){
                     
                     next(error)
                     console.log("Error from SendMessage", error);
                 }
         }
             module.exports={SendMessage}