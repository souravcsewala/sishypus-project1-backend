const { Schema, model } = require("mongoose");

const GerManClassSchema = new Schema({
  month: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

//
const GerManClassDateModel = new model("germanclassdate", GerManClassSchema);

module.exports = GerManClassDateModel;
