const express = require("express");

const { isAuthCheak } = require("../middileware/IsAuthCheck");

const {isAdminCheak}=require("../middileware/IsAdminCheck")

const {getEnrolledCourses,getCourseClasses,
    getUserOrders,getOrderDetails
}=require("../controllers/StudentController")

const Router = express.Router();

//! 1. get user enrolled course 
Router.route('/enrolled-courses/:userId').get(isAuthCheak,isAdminCheak("student"),getEnrolledCourses) 

//!2. get enroll course's classes 
Router.route("/courses/:courseId/classes").get(isAuthCheak,isAdminCheak("student"),getCourseClasses)

//!3. get student order payment status 
Router.route("/orders/payment-status").get(isAuthCheak,isAdminCheak("student"),getUserOrders)

//!4. get student download the oder and payment status 
Router.route("/order/:orderId").get(isAuthCheak,isAdminCheak("student"),getOrderDetails)


module.exports = Router;