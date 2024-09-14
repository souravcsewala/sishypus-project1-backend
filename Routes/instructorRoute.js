
const express = require("express");

const{isAuthCheak}=require("../middileware/IsAuthCheck")
const{isAdminCheak}=require("../middileware/IsAdminCheck")
const { CreateCard,
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
    DeleteGermanClass,}=require("../controllers/AdminControllers")
const {GetWhiteCard,
    GetAllEvents,
    GetGermanClass,
    GetGermanCourse,
    GetExcelCourse,
    GetExcelWebniarinfo}=require("../controllers/infoForUsers")
    const Router = express.Router();

   // 1. create  whitepaper card with pdf file by admin -- admin power 
   Router.route("/admin/whitepaper/new").post(isAuthCheak,isAdminCheak("faculty"),CreateCard)

   // 2. update whitepaper card by admin -- admin power 
 Router.route("/admin/whitepaper/update/:id").put(isAuthCheak,isAdminCheak("faculty"), UpdateCard)

//3 .  delete white paper card by admin -- admin power 
Router.route("/admin/whitepaper/remove/:id").put(isAuthCheak,isAdminCheak("faculty"),CardDelete )

//4. get the list who are register for free consultation
Router.route("/admin/getConsultancy").get(isAuthCheak,isAdminCheak("faculty"), GetConsultancy)

//5. create all upcoming events 
 Router.route("/admin/create/Upcomingevents").post(isAuthCheak,isAdminCheak("faculty"),CreateUpcomingEvents)

//6. update upcoming events 
Router.route("/admin/Allevents/update/:id").put(isAuthCheak,isAdminCheak("faculty"),UpdateEvents )

//7. delete events 
 Router.route("/admin/Allevents/remove/:id").delete(isAuthCheak,isAdminCheak("faculty"),RemoveEvents)

//8. create german course 
Router.route("/admin/create/germanCourse").post(isAuthCheak,isAdminCheak("faculty"),CreateGermanCourse)

//9. update german course 
Router.route("/admin/germancourse/update/:id").put(isAuthCheak,isAdminCheak("faculty"),UpdateGermanCourse)

//10. delete german course 
Router.route("/admin/germancourse/remove/:id").delete(isAuthCheak,isAdminCheak("faculty"),DeleteGermanCourse)

//11. create excel course
Router.route("/admin/create/excelCourse").post(isAuthCheak,isAdminCheak("faculty"),CreateExcelCourse)

//12. update excel course 
Router.route("/admin/excelcourse/update/:id").put(isAuthCheak,isAdminCheak("faculty"),UpdateExcelCourse)

//13. remove excel course 
Router.route("/admin/excelcourse/remove/:id").delete(isAuthCheak,isAdminCheak("faculty"),DeleteExcelCourse)

//14. make excel webniar date 
Router.route("/admin/create/excelWebniar").post(isAuthCheak,isAdminCheak("faculty"),CreateExcelWebniar)

//15.update excel webniar 
Router.route("/admin/excelwebniar/update/:id").put(isAuthCheak,isAdminCheak("faculty"),UpdateExcelWebniar)

//16. remove excel webniar 
Router.route("/admin/excelwebniar/remove/:id").delete(isAuthCheak,isAdminCheak("faculty"),DeleteExcelWEbniar)

//17.  get excel webniar register list 

Router.route("/admin/getExcelwebniar/list").get(isAuthCheak,isAdminCheak("faculty"), GetExcelWebniarRegisterList) 

//18. german class start post 
Router.route("/admin/create/germanClass").post(isAuthCheak,isAdminCheak("faculty"),CreateGermanClassDate)

//19. german class update 
Router.route("/admin/germanclass/update/:id").put(isAuthCheak,isAdminCheak("faculty"),UpdateGermanClass)

//20. remove german class date 
Router.route("/admin/excelwebniar/remove/:id").delete(isAuthCheak,isAdminCheak("faculty"),DeleteGermanClass)

//21. get white card
Router.route("/admin/getwhitecard").get(isAuthCheak,isAdminCheak("faculty"),GetWhiteCard)

//22.  Get All Events
Router.route("/admin/getallevents").get(isAuthCheak,isAdminCheak("faculty"),GetAllEvents)

//23.  get german class start info
Router.route("/admin/getgermanclass").get(isAuthCheak,isAdminCheak("faculty"),GetGermanClass)

//24. get german course 
Router.route("/admin/getgermancourse").get(isAuthCheak,isAdminCheak("faculty"),GetGermanCourse)

//25. get excel course
Router.route("/admin/getexcelcourse").get(isAuthCheak,isAdminCheak("faculty"),GetExcelCourse)

//26. get excel webniar info 
Router.route("/admin/excel-webniar-info").get(isAuthCheak,isAdminCheak("faculty"),GetExcelWebniarinfo)




        module.exports = Router;


           
        

