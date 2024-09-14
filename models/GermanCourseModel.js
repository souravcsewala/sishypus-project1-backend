const { model, Schema } = require("mongoose");

const GermanCourseSchema = new Schema({
  image:{
    type:String,
    default:"https://media.istockphoto.com/id/1096979810/vector/german-hand-drawn-doodles-and-lettering.jpg?s=1024x1024&w=is&k=20&c=w-w7fSqFR2eNXR4cK9qrDrnCIrHP2M4IErHlqG-K1YU="
  },
  title: {
    type: String,
    required: [true, "please enter the title of the Course"],
  },
  description: {
    type: String,
    required: [true, "please enter the Description of the Course"],
  },
  totalclass: {
    type: Number,
    required: [true, "please enter the totalclass of the Course"],
    default: 15,
  },
  duration: {
    type: Number,
    required: [true, "please enter the dsuration of the Course"],
    default: 4,
  },
  discount: {
    type: Number,
    required: [true, "please enter the Discount of the Course"],
    default: 2500,
  },
  price: {
    type: Number,
    required: [true, "please enter the Price of the Course"],
    default: 6000,
  },
});
const GermanCourseModel = new model("GermanCourseModel", GermanCourseSchema);

module.exports = GermanCourseModel;
