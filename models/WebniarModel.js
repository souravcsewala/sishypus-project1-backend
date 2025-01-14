const { Schema, model } = require("mongoose");

const WebniarSchema = new Schema(
  { image:{
     type:String,
      default:"https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.jpg?s=612x612&w=0&k=20&c=gWTTDs_Hl6AEGOunoQ2LsjrcTJkknf9G8BGqsywyEtE="
  },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    Url: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const WebniarModel = new model("webniar", WebniarSchema);

module.exports = WebniarModel;
