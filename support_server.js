          
                const express=require("express");
                  const {DataBaseconnection} = require("./Database/DBconnection")
                   const errorMiddliware=require("./middileware/errorMiddileware");
                   const cookieParser = require("cookie-parser");
                   const fileUpload = require("express-fileupload");
                   const bodyParser = require("body-parser");
                  const support_server=express();
                  const cloudinary = require("cloudinary")
                             
                        // middileware for json
                         support_server.use(express.json());
                         support_server.use(cookieParser());
                         support_server.use(bodyParser.urlencoded({ extended: true }));
                         support_server.use(fileUpload());
                        

                       // database connect come on sourav
                       DataBaseconnection();
                         // card pdf files upload on cloudinary
                         cloudinary.config({
                          cloud_name: process.env.CLOUDINARY_NAME,
                          api_key: process.env.CLOUDINARY_API_KEY,
                          api_secret: process.env.CLOUDINARY_API_SECRET,
                        });

                     // routes path home 
                     support_server.get('/',(req,res)=>{
                        res.send("hii this sisyphus project1 server by sourav,test api ")
                     })
                          
                support_server.use("/sisyphus/project1/api",require("./Routes/AuthRoute"))
                support_server.use("/sisyphus/project1/api",require("./Routes/MessageRoute"))

                    // error middileware
                support_server.use(errorMiddliware)
                  module.exports={support_server}

         
