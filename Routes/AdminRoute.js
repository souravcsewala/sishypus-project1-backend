
const express = require("express");

const{isAuthCheak}=require("../middileware/IsAuthCheck")
const{isAdminCheak}=require("../middileware/IsAdminCheck")
const {UserDetailsAll,
    AllMessagefromUser,
    GetInstructorDetails,
    UpdateInstructor,
    RemoveInstructor,
    UpdateUser,
     CreateCard,
     UpdateCard,
     CardDelete,
     GetConsultancy,
     CreateUpcomingEvents,
     UpdateEvents,
     RemoveEvents,
     CreateGermanCourse,
     UpdateGermanCourse,
     DeleteGermanCourse,
     CreateExcelCourse,
     UpdateExcelCourse,
     DeleteExcelCourse,
     CreateExcelWebniar,
     UpdateExcelWebniar,
     DeleteExcelWEbniar,
     GetExcelWebniarRegisterList,
     CreateGermanClassDate,
     UpdateGermanClass,
     DeleteGermanClass,
     
}=require("../controllers/AdminControllers")
const{GetWhiteCard,
  GetAllEvents,
  GetGermanClass,
  GetGermanCourse,
  GetExcelCourse,
  GetExcelWebniarinfo
}=require("../controllers/infoForUsers")
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

   //10. get the list who are register for free consultation
   Router.route("/admin/getConsultancy").get(isAuthCheak,isAdminCheak("admin"), GetConsultancy)

   //11. create all upcoming events 
    Router.route("/admin/create/Upcomingevents").post(isAuthCheak,isAdminCheak("admin"),CreateUpcomingEvents)

  //12. update upcoming events 
  Router.route("/admin/Allevents/update/:id").put(isAuthCheak,isAdminCheak("admin"),UpdateEvents )

  //13. delete events 
    Router.route("/admin/Allevents/remove/:id").delete(isAuthCheak,isAdminCheak("admin"),RemoveEvents)

 //14. create german course 
  Router.route("/admin/create/germanCourse").post(isAuthCheak,isAdminCheak("admin"),CreateGermanCourse)

  //15. update german course 
  Router.route("/admin/germancourse/update/:id").put(isAuthCheak,isAdminCheak("admin"),UpdateGermanCourse)

  //16. delete german course 
  Router.route("/admin/germancourse/remove/:id").delete(isAuthCheak,isAdminCheak("admin"),DeleteGermanCourse)

  //17. create excel course
  Router.route("/admin/create/excelCourse").post(isAuthCheak,isAdminCheak("admin"),CreateExcelCourse)

  //18. update excel course 
  Router.route("/admin/excelcourse/update/:id").put(isAuthCheak,isAdminCheak("admin"),UpdateExcelCourse)

  //19. remove excel course 
  Router.route("/admin/excelcourse/remove/:id").delete(isAuthCheak,isAdminCheak("admin"),DeleteExcelCourse)

  //20. make excel webniar date 
  Router.route("/admin/create/excelWebniar").post(isAuthCheak,isAdminCheak("admin"),CreateExcelWebniar)

  //21.update excel webniar 
 Router.route("/admin/excelwebniar/update/:id").put(isAuthCheak,isAdminCheak("admin"),UpdateExcelWebniar)

 //22. remove excel webniar 
 Router.route("/admin/excelwebniar/remove/:id").delete(isAuthCheak,isAdminCheak("admin"),DeleteExcelWEbniar)

 //23.  get excel webniar register list 
  
 Router.route("/admin/getExcelwebniar/list").get(isAuthCheak,isAdminCheak("admin"), GetExcelWebniarRegisterList) 

 //24. german class start post 
   Router.route("/admin/create/germanClass").post(isAuthCheak,isAdminCheak("admin"),CreateGermanClassDate)

//25. german class update 
Router.route("/admin/germanclass/update/:id").put(isAuthCheak,isAdminCheak("admin"),UpdateGermanClass)

//26. remove german class date 
Router.route("/admin/excelwebniar/remove/:id").delete(isAuthCheak,isAdminCheak("admin"),DeleteGermanClass)

//27. get white card
Router.route("/admin/getwhitecard").get(isAuthCheak,isAdminCheak("admin"),GetWhiteCard)

//28.  Get All Events
Router.route("/admin/getallevents").get(isAuthCheak,isAdminCheak("admin"),GetAllEvents)

//29.  get german class start info
Router.route("/admin/getgermanclass").get(isAuthCheak,isAdminCheak("admin"),GetGermanClass)

//30. get german course 
Router.route("/admin/getgermancourse").get(isAuthCheak,isAdminCheak("admin"),GetGermanCourse)

//31. get excel course
Router.route("/admin/getexcelcourse").get(isAuthCheak,isAdminCheak("admin"),GetExcelCourse)

//32. get excel webniar info 
Router.route("/admin/excel-webniar-info").get(isAuthCheak,isAdminCheak("admin"),GetExcelWebniarinfo)




           module.exports = Router;

