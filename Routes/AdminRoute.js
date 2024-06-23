
const express = require("express");

const{isAuthCheak}=require("../middileware/IsAuthCheak")
const{isAdminCheak}=require("../middileware/IsAdminCheak")
const {UserDetailsAll,
    AllMessagefromUser,
    GetInstructorDetails,
    UpdateInstructor,
    RemoveInstructor,
    UpdateUser,
     CreateCard,
     UpdateCard,
     CardDelete
}=require("../controllers/AdminControllers")
const Router = express.Router();  
    //1. get all user detail which are register -- admin power 
     Router.route("/admin/getAllUsers").get(isAuthCheak,isAdminCheak("admin"),UserDetailsAll)

     //2. update user which are register admin can update their details -- admin power
    Router.route("/admin/update/user/:id").put(isAuthCheak,isAdminCheak("admin"),UpdateUser)

    //3.  get all instructor by admin -- admin power
    Router.route("/admin/getAllinstructor").get(isAuthCheak,isAdminCheak("admin"),GetInstructorDetails)

    //4. update instructor by admin -- admin power 
    Router.route("/admin/update/instructor/:id").get(isAuthCheak,isAdminCheak("admin"), UpdateInstructor)

    // 5. delete any instructor by admin -- admin power 
     Router.route("/admin/delete/instructor/:id").delete(isAuthCheak,isAdminCheak("admin"),RemoveInstructor )

      // 6. get all message from user -- admin power 
    Router.route("/admin/getAllmessage/user").get(isAuthCheak,isAdminCheak("admin"),AllMessagefromUser)
      
     // 7. create  whitepaper card with pdf file by admin -- admin power 
    Router.route("/admin/whitepaper/new").post(isAuthCheak,isAdminCheak("admin"),CreateCard)

      // 8. update whitepaper card by admin -- admin power 
    Router.route("/admin/whitepaper/update/:id").put(isAuthCheak,isAdminCheak("admin"), UpdateCard)
   //9 .  delete white paper card by admin -- admin power 
   Router.route("/admin/whitepaper/remove/:id").put(isAuthCheak,isAdminCheak("admin"),CardDelete )
   
           module.exports = Router;

