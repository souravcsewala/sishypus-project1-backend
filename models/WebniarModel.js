
const {Schema,model}=require("mongoose");
   
     const WebniarSchema=new Schema({
           title:{
               type:String
           },
           description:{
            type:String
           },
           Url:{
             type:String
           },
           createdAt: {
            type: Date,
            default: Date.now,
          }
            },
              {timestamps:true}
        )


             const WebniarModel= new model("webniar",WebniarSchema);

                  module.exports=WebniarModel

    