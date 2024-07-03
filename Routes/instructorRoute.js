
const express = require("express");

const{isAuthCheak}=require("../middileware/IsAuthCheak")
const{isAdminCheak}=require("../middileware/IsAdminCheak")
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
   Router.route("/admin/whitepaper/new").post(isAuthCheak,isAdminCheak("instructor"),CreateCard)

   // 2. update whitepaper card by admin -- admin power 
 Router.route("/admin/whitepaper/update/:id").put(isAuthCheak,isAdminCheak("instructor"), UpdateCard)

//3 .  delete white paper card by admin -- admin power 
Router.route("/admin/whitepaper/remove/:id").put(isAuthCheak,isAdminCheak("instructor"),CardDelete )

//4. get the list who are register for free consultation
Router.route("/admin/getConsultancy").get(isAuthCheak,isAdminCheak("instructor"), GetConsultancy)

//5. create all upcoming events 
 Router.route("/admin/create/Upcomingevents").post(isAuthCheak,isAdminCheak("instructor"),CreateUpcomingEvents)

//6. update upcoming events 
Router.route("/admin/Allevents/update/:id").put(isAuthCheak,isAdminCheak("instructor"),UpdateEvents )

//7. delete events 
 Router.route("/admin/Allevents/remove/:id").delete(isAuthCheak,isAdminCheak("instructor"),RemoveEvents)

//8. create german course 
Router.route("/admin/create/germanCourse").post(isAuthCheak,isAdminCheak("instructor"),CreateGermanCourse)

//9. update german course 
Router.route("/admin/germancourse/update/:id").put(isAuthCheak,isAdminCheak("instructor"),UpdateGermanCourse)

//10. delete german course 
Router.route("/admin/germancourse/remove/:id").delete(isAuthCheak,isAdminCheak("instructor"),DeleteGermanCourse)

//11. create excel course
Router.route("/admin/create/excelCourse").post(isAuthCheak,isAdminCheak("instructor"),CreateExcelCourse)

//12. update excel course 
Router.route("/admin/excelcourse/update/:id").put(isAuthCheak,isAdminCheak("instructor"),UpdateExcelCourse)

//13. remove excel course 
Router.route("/admin/excelcourse/remove/:id").delete(isAuthCheak,isAdminCheak("instructor"),DeleteExcelCourse)

//14. make excel webniar date 
Router.route("/admin/create/excelWebniar").post(isAuthCheak,isAdminCheak("instructor"),CreateExcelWebniar)

//15.update excel webniar 
Router.route("/admin/excelwebniar/update/:id").put(isAuthCheak,isAdminCheak("instructor"),UpdateExcelWebniar)

//16. remove excel webniar 
Router.route("/admin/excelwebniar/remove/:id").delete(isAuthCheak,isAdminCheak("instructor"),DeleteExcelWEbniar)

//17.  get excel webniar register list 

Router.route("/admin/getExcelwebniar/list").get(isAuthCheak,isAdminCheak("instructor"), GetExcelWebniarRegisterList) 

//18. german class start post 
Router.route("/admin/create/germanClass").post(isAuthCheak,isAdminCheak("instructor"),CreateGermanClassDate)

//19. german class update 
Router.route("/admin/germanclass/update/:id").put(isAuthCheak,isAdminCheak("instructor"),UpdateGermanClass)

//20. remove german class date 
Router.route("/admin/excelwebniar/remove/:id").delete(isAuthCheak,isAdminCheak("instructor"),DeleteGermanClass)

//21. get white card
Router.route("/admin/getwhitecard").get(isAuthCheak,isAdminCheak("instructor"),GetWhiteCard)

//22.  Get All Events
Router.route("/admin/getallevents").get(isAuthCheak,isAdminCheak("instructor"),GetAllEvents)

//23.  get german class start info
Router.route("/admin/getgermanclass").get(isAuthCheak,isAdminCheak("instructor"),GetGermanClass)

//24. get german course 
Router.route("/admin/getgermancourse").get(isAuthCheak,isAdminCheak("instructor"),GetGermanCourse)

//25. get excel course
Router.route("/admin/getexcelcourse").get(isAuthCheak,isAdminCheak("instructor"),GetExcelCourse)

//26. get excel webniar info 
Router.route("/admin/excel-webniar-info").get(isAuthCheak,isAdminCheak("instructor"),GetExcelWebniarinfo)




        module.exports = Router;


           
        

