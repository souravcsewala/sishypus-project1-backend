          
                const express=require("express");
                  const {DataBaseconnection} = require("./Database/DBconnection")
                   const errorMiddliware=require("./middileware/errorMiddileware");
                   const cookieParser = require("cookie-parser");
                  const support_server=express();
                             
                        // middileware for json
                         support_server.use(express.json());
                         support_server.use(cookieParser());

                        

                       // database connect come on sourav
                       DataBaseconnection();


                     // routes path home 
                     support_server.get('/',(req,res)=>{
                        res.send("hii this sisyphus project1 server by sourav,test api ")
                     })
                          
                support_server.use("/sisyphus/project1/api",require("./Routes/AuthRoute"))
                support_server.use("/sisyphus/project1/api",require("./Routes/MessageRoute"))

                    // error middileware
                support_server.use(errorMiddliware)
                  module.exports={support_server}

         
