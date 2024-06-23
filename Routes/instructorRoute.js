
const express = require("express");

const{isAuthCheak}=require("../middileware/IsAuthCheak")
const{isAdminCheak}=require("../middileware/IsAdminCheak")
const {CreateWebniar}=require("../controllers/instructorcon")
    const Router = express.Router();

    //1. webinar create route -- instructor 
 Router.route("/instructor/webniar/info/upload").post(isAuthCheak,isAdminCheak("instructor"),CreateWebniar)
           
         module.exports = Router;

