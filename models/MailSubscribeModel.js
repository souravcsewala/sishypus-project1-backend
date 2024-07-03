
    const {model,Schema}=require("mongoose");
    const validator=require("validator")

      const MailSubscribeSchema= new Schema({
           subscribemai:{
              type:String,
              required:[true,"please your mail id"],
              match: [/.+\@.+\..+/, 'Please enter a valid email address'],
              validate:[validator.isEmail,"plz enter valid mail id"]

           }
      })

          const SubscribeMailModel= new model("subscribemail",MailSubscribeSchema);

              module.exports=SubscribeMailModel;