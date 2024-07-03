
const ErrorHandeler = require("../special/errorHandelar");
const FreeconsultancyModel=require("../models/FreeConsultation")
const ExcelWebniarRegisterModel=require("../models/ExcelWebniarRegisterModel")
const WhiteCardModel=require("../models/CardModel") 
const UpcomingEventsModel=require("../models/UpcominkgAllevents")
const GermanClassModel=require("../models/GerManClassStartModel")
const GermanCourseModel=require("../models/GermanCourseModel")
const ExcelCourseModel=require("../models/ExelCourseModel")
const ExcelWebniarModel=require("../models/ExcelWebniarModel")


//1. user post for free consultation -- for user 
     const RegisterForconsaltation=async(req,res,next)=>{
             try{
      const{name,email,countryCode,phone,subject,message}=req.body
      if(!name || !email || !countryCode || !phone || !subject || !message){
            return next(new ErrorHandeler("please provide all details",400))
      }
     const Register= await FreeconsultancyModel.create({name,email,countryCode,phone,subject,message})
     res.status(201).json({
    message:"you have successfully register for free consaltation",
     success:true,
    data:Register})

      }catch(error){
    console.log("the error from RegisterForconsaltation",error)
     next(error)     
      }
     }
    
//2. user post register for excel webniar -- for user 
const RegisterForExcelWebniar=async(req,res,next)=>{
    try{
const{name,email,countryCode,phone,selectcourse,occupation,address}=req.body
if(!name || !email || !countryCode || !phone || !selectcourse || !occupation){
   return next(new ErrorHandeler("please provide all details",400))
}
const Register= await ExcelWebniarRegisterModel.create({name,email,countryCode,phone,selectcourse,occupation,address})
res.status(201).json({
message:"you have successfully register for Excel webniar register",
success:true,
data:Register})

}catch(error){
console.log("the error from RegisterForExcelWebniar",error)
next(error)     
}
}
//3. get white card -- for user,admin,instructor
const GetWhiteCard = async (req, res, next) => {
    try {
        const GetCard = await WhiteCardModel.find({});
        if (!GetCard || GetCard.length === 0) {
            return next(new ErrorHandeler("No white card found", 404));
        }
        res.status(200).send({
            message: "White card found successfully, here is the list",
            success: true,
            totalCard: GetCard.length,
            data: GetCard
        });
    } catch (error) {
        console.log("The error from get white card", error);
        next(error);
    }
};

//4. get upcoming events -- for user,admin,instructor
const GetAllEvents = async (req, res, next) => {
    try {
        const GetEvents = await UpcomingEventsModel.find({});
        if (!GetEvents || GetEvents.length === 0) {
            return next(new ErrorHandeler("No events found", 404));
        }
        res.status(200).send({
            message: "Events found successfully, here is the list",
            success: true,
            totalEvents: GetEvents.length,
            data: GetEvents
        });
    } catch (error) {
        console.log("The error from get Events", error);
        next(error);
    }
};
//5. get german class start info --for user,admin,instructor
const GetGermanClass = async (req, res, next) => {
    try {
        const GetClass = await GermanClassModel.find({});
        if (!GetClass || GetClass.length === 0) {
            return next(new ErrorHandeler("No class found", 404));
        }
        res.status(200).send({
            message: "class found successfully, here is the list",
            success: true,
            totalClass: GetClass.length,
            data: GetClass
        });
    } catch (error) {
        console.log("The error from get German class", error);
        next(error);
    }
};
//6. get german course -- for user,admin,instructor
const GetGermanCourse = async (req, res, next) => {
    try {
        const GetCourses = await GermanCourseModel.find({});
        if (!GetCourses || GetCourses.length === 0) {
            return next(new ErrorHandeler("No course found", 404));
        }
        res.status(200).send({
            message: "course found successfully, here is the list",
            success: true,
            totalCourse: GetCourses.length,
            data: GetCourses
        });
    } catch (error) {
        console.log("The error from get German courses", error);
        next(error);
    }
};
//7. get excel course -- for user,admin,instructor
const GetExcelCourse = async (req, res, next) => {
    try {
        const GetCourses = await ExcelCourseModel.find({});
        if (!GetCourses || GetCourses.length === 0) {
            return next(new ErrorHandeler("No course found", 404));
        }
        res.status(200).send({
            message: "course excel found successfully, here is the list",
            success: true,
            totalCourse: GetCourses.length,
            data: GetCourses
        });
    } catch (error) {
        console.log("The error from get excel courses", error);
        next(error);
    }
};
//8. get excel webniar info -- for user,admin,instructor
const GetExcelWebniarinfo = async (req, res, next) => {
    try {
        const GetWebniar = await ExcelWebniarModel.find({});
        if (!GetWebniar || GetWebniar.length === 0) {
            return next(new ErrorHandeler("No excel webniar found", 404));
        }
        res.status(200).send({
            message: "excel webniar found successfully, here is the list",
            success: true,
            totalWebniar: GetWebniar.length,
            data: GetWebniar
        });
    } catch (error) {
        console.log("The error from get excel webniare", error);
        next(error);
    }
};

module.exports={
    RegisterForconsaltation,
    RegisterForExcelWebniar,
    GetWhiteCard,
    GetAllEvents,
    GetGermanClass,
    GetGermanCourse,
    GetExcelCourse,
    GetExcelWebniarinfo

}


