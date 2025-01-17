const ContactModel = require("../models/contactModel");
const ErrorHandeler = require("../special/errorHandelar");

//!1. send message

const SendMessage = async (req, res, next) => {
  try {
    const { firstname, lastname, email, company, phone, message } = req.body;
    if (!firstname || !lastname || !email || !company || !phone || !message) {
      return next(new ErrorHandeler("Please provide all details", 401));
    }
    const Message = await ContactModel.create({
      firstname,
      lastname,
      email,
      company,
      phone,
      message,
    });
    res.status(201).json({
      success: true,
      message: "Message send  successfully",
      Message,
    });
  } catch (error) {
    next(error);
    console.log("Error from SendMessage", error);
  }
};
module.exports = { SendMessage };
