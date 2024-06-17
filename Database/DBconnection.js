
    const mongoose=require("mongoose");

       const MONGO_URI = process.env.MONGODB_URL_Test;

         const DataBaseconnection=async()=>{
                 try{
                       await mongoose.connect(MONGO_URI);
                       console.log(`Database is connected to ${mongoose.connection.host}`.red.bgMagenta)
                 }catch(error){
                       console.log(`the problem from database ${error}`)
                 }
         }
         module.exports={DataBaseconnection};

           