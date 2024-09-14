const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "plz provide title of the card"],
     
    },
    readTime: {
      type: String,
      required: [true, "plz provide reading time"],
     
    },
    tagName: {
      type: String,
      required: [true, "plz provide tagName"],
     
    },
    pdfFile: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
const WhiteCardModel = new mongoose.model("whitepaper", CardSchema);

module.exports = WhiteCardModel;
