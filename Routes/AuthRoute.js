const express = require("express");
const {
  UserRegister,
 Logout,
  Login,
  StudentLogin
  
} = require("../controllers/Authcontrollers");
const { isAuthCheak } = require("../middileware/IsAuthCheck");

const Router = express.Router();

// 1. User register route
Router.route("/userRegister").post(UserRegister);
// 2. user Login Route
Router.route("/Login").post(Login);
//3. user logout
Router.route("/logout").post(Logout);

//4. student login 
Router.route("/student-login").post( StudentLogin)


module.exports = Router;
