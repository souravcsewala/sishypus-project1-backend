const express = require("express");
const { SendMessage } = require("../controllers/UserMessagecon");


const Router = express.Router();

//! 1. User sends Message
Router.route("/sendMessage").post(SendMessage);

module.exports = Router;
