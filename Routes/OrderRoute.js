const express = require("express");

const{isAuthCheak}=require("../middileware/IsAuthCheck")

const{createOrder,SendRazoPayKey,verifyPayment}=require("../controllers/OrderController")

const Router = express.Router();

//!1. send razopaykeyid to the fronted only for login users

  Router.route("/api/send-razopay-key").get(SendRazoPayKey)

//!2. create order 
  Router.route("/api/create-order").post(createOrder)


  //!3. verify payment 

  Router.route("/api/verify-success-payment").post(verifyPayment)









module.exports=Router;
