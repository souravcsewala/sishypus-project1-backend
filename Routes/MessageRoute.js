const express = require("express");
const { SendMessage } = require("../controllers/UserMessagecon");
const { isAuthCheak } = require("../middileware/IsAuthCheck"); // Ensure correct import

const Router = express.Router();

// 1. User sends Message
Router.route("/sendMessage").post(isAuthCheak, SendMessage);

module.exports = Router;
