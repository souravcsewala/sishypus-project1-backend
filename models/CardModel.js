const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "plz provide title of the card"],
      maxlength: [800, "title cannot exceed 800 characters"],
    },
    readTime: {
      type: String,
      required: [true, "plz provide reading time"],
      maxlength: [200, "readTime cannot exceed 800 characters"],
    },
    tagName: {
      type: String,
      required: [true, "plz provide tagName"],
      maxlength: [200, "readTime cannot exceed 200 characters"],
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
