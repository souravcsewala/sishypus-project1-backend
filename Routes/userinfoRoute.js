
const express = require("express");

const{isAuthCheak}=require("../middileware/IsAuthCheck")

const{GetWhiteCard,
    GetAllEvents,
    GetGermanClass,
    GetGermanCourse,
    GetExcelCourse,
    GetExcelWebniarinfo,
    RegisterForconsaltation,
    LoadUser
  }=require("../controllers/infoForUsers")

const Router = express.Router();  

//!1. post for free consultation without login 
  Router.route("/user/free-consaltation").post(RegisterForconsaltation)

//!2.  user post register for excel webniar 
Router.route("/user/excel-webniar").post(isAuthCheak,GetExcelWebniarinfo)

//!3.  get excel course
Router.route("/user/excel-course").get(GetExcelCourse)

//!4. get german course 
Router.route("/user/german-course").get(GetGermanCourse)

//!5. get german class 
Router.route("/user/german-class").get(GetGermanClass)

//!6. get all events 
Router.route("/user/events").get(GetAllEvents)

//!7. get white card 
Router.route("/user/white-card").get(GetWhiteCard)

//!8. get excel webniar info 
Router.route("/user/excel-webniar-info").get(GetExcelWebniarinfo)
//!9. user load route for loggin user 
Router.route("/user/load-user-info").get(isAuthCheak,LoadUser)
module.exports=Router;