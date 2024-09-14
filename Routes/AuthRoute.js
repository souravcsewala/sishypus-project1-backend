const express = require("express");
const { UserRegister ,UserLogin,userLogout} = require("../controllers/Authcontrollers");
 const {isAuthCheak}= require("../middileware/IsAuthCheck")
const Router = express.Router();

// 1. User register route
Router.route("/userRegister").post(UserRegister);
// 2. user Login Route 
Router.route("/userLogin").post(UserLogin)
//3. user logout 
  Router.route("/userlogout").post(userLogout);

 

module.exports = Router;
