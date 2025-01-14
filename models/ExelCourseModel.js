const { model, Schema } = require("mongoose");

const ExcelCourseSchema = new Schema({
  image:{
    type:String,
    default:"https://img.freepik.com/free-vector/report-concept-illustration_114360-1173.jpg?w=740&t=st=1725939252~exp=1725939852~hmac=1c79222cff6fa1691e7d19319bc97eeb2164d46748a2b0a77546ba46b6ccb50b"
  },
  title: {
    type: String,
    required: [true, "please enter the title of the Course"],
  },
  weeklyclass: {
    type: Number,
    required: [true, "please enter the value of weekly class of the Course"],
    default: 2,
  },
  totalclass: {
    type: Number,
    required: [true, "please enter the totalclass of the Course"],
    default: 30,
  },
  duration: {
    type: Number,
    required: [true, "please enter the dsuration of the Course"],
    default: 3.5,
  },
  discount: {
    type: Number,
    required: [true, "please enter the Discount of the Course"],
    default: 3000,
  },
  price: {
    type: Number,
    required: [true, "please enter the Price of the Course"],
    default: 6000,
  },
});
const ExcelCourseModel = new model("ExcelCourseModel", ExcelCourseSchema);

module.exports = ExcelCourseModel;
