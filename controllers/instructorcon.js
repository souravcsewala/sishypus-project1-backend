
      const WebniarModel=require("../models/WebniarModel");
const ErrorHandelar = require("../special/errorHandelar");

      // 1. upload webniar url by instructor -- instructor power 

             const CreateWebniar=async(req,res,next)=>{
                   try{
                           const{ title, description, Url}=req.body
                               if(!title || !description || !Url){
                                    return next (new ErrorHandelar("plz provide all details",401))
                               }
                                 const Webniar= await WebniarModel.create({
                                        title,
                                        description,
                                        Url,
                                 })
                                    res.status(201).send({
                                         success:true,
                                         message:"webniar uploaded successfully",
                                         Webniar
                                    })
                   }catch(error){
                        console.log("this error from CreateWebniar ",error)
                   }
             }

                 module.exports={CreateWebniar}