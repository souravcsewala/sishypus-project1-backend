const express = require("express");
const { UserRegister ,UserLogin,userLogout,GetWebniarDetails} = require("../controllers/Authcontrollers");
 const {isAuthCheak}= require("../middileware/IsAuthCheak")
const Router = express.Router();

// 1. User register route
Router.route("/userRegister").post(UserRegister);
// 2. user Login Route 
Router.route("/userLogin").post(UserLogin)
//3. user logout 
  Router.route("/userlogout").get(userLogout);

  //4. get webniar details by user -- user route 
   Router.route("/getwebniar/info").get(GetWebniarDetails)

module.exports = Router;
