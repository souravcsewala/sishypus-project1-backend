
const express = require("express");
const { SendMessage} = require("../controllers/UserMessagecon");
const{isAuthCheak}=require("../middileware/IsAuthCheck")
const Router = express.Router();

    //1. user send Message
    Router.route("/sendMessage").post(isAuthCheak,SendMessage);

module.exports = Router;
