const UserModel = require("../models/userModel");

const ContactModel = require("../models/contactModel");
const ErrorHandeler = require("../special/errorHandelar");
const WhiteCardModel = require("../models/CardModel");
const FreeconsultancyModel = require("../models/FreeConsultation");
const UpcomingEventsModel = require("../models/UpcominkgAllevents");
const GermanClassModel = require("../models/GerManClassStartModel");
const GermanCourseModel = require("../models/GermanCourseModel");
const ExcelCourseModel = require("../models/ExelCourseModel");
const ExcelWebniarModel = require("../models/ExcelWebniarModel");
const ExcelWebniarRegisterModel = require("../models/ExcelWebniarRegisterModel");
const cloudinary = require("cloudinary");

//1. get user all -- admin power only

const UserDetailsAll = async (req, res, next) => {
  try {
    const users = await UserModel.find({});
    if (!users || users.length === 0) {
      return next(new ErrorHandeler("no one register", 401));
    }
    res.status(200).json({
      success: true,
      message: "there is all user list",
      users,
    });
  } catch (error) {
    console.error(`Error from get user details in admin panel: ${error}`);
    next(error);
  }
};
// 2. get all messages -- admin power
const AllMessagefromUser = async (req, res, next) => {
  try {
    const GetMessages = await ContactModel.find({});
    if (!GetMessages || GetMessages.length === 0) {
      return next(new ErrorHandeler("there is no any message", 401));
    }
    res.status(200).json({
      success: true,
      message: "there is all message list",
      GetMessages,
    });
  } catch (error) {
    console.log(`the error from get AllMessagefromUser: ${error}`);
    next(error);
  }
};

// 3. get instructor all -- admin power only

const GetInstructorDetails = async (req, res, next) => {
  try {
    const instructors = await UserModel.find({ role: "instructor" });
    if (!instructors || instructors.length === 0) {
      return next(new ErrorHandeler("there is no is instructors now", 401));
    }
    res.status(200).json({
      success: true,
      message: "there is all instructor list",
      instructors,
      totalinstructors: instructors.length,
    });
  } catch (error) {
    console.error(`get instructor details ${error}`);
    next(error);
  }
};

//4. update instructors by admin -- admin power

const UpdateInstructor = async (req, res, next) => {
  try {
    const { newName, newEmail, newRole } = req.body;
    const newUpdateByAdmin = {
      name: newName,
      email: newEmail,
      role: newRole,
    };
    const UpdateInstructorAdmin = await UserModel.findByIdAndUpdate(
      req.params.id,
      newUpdateByAdmin,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    if (!UpdateInstructorAdmin) {
      return next(new ErrorHandeler(" updated fail", 500));
    }
    res.status(200).json({
      message: "heey admin instructor update succesfully",
      success: true,
      UpdateInstructorAdmin,
    });
  } catch (error) {
    console.log(`this error from user update by admin ${error}`);
    next(error);
  }
};

// 5. delete instructor by admin -- admin power

const RemoveInstructor = async (req, res, next) => {
  try {
    const findInstructor = await UserModel.findById(req.params.id);
    if (!findInstructor) {
      return next(new ErrorHandeler("oops! instructor not found", 404));
    }
    const userDelete = await UserModel.deleteOne({ _id: req.params.id });
    //    const instructorsNumber=await UserModel.find({role:"instructor"});
    const instructorCount = await UserModel.countDocuments({
      role: "instructor",
    });
    res.status(200).json({
      message: "instructor delete succesfully",
      userDelete,
      Numberofinstructor: instructorCount,
    });
  } catch (error) {
    console.log(`the error from RemoveInstructor ${error}`);
    next(error);
  }
};

// 6. update user by admin -- admin power
const UpdateUser = async (req, res, next) => {
  try {
    const { newName, newEmail, newRole } = req.body;
    const newUpdateByAdmin = {
      name: newName,
      email: newEmail,
      role: newRole,
    };
    const UpdateUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      newUpdateByAdmin,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    if (!UpdateUser) {
      return next(new ErrorHandeler(" updated fail", 404));
    }
    res.status(200).json({
      message: "user update succesfully",
      success: true,
      UpdateUser,
    });
  } catch (error) {
    console.log(`the error from update user by admin ${error}`);
    next(error);
  }
};
// 7. create white card by admin -- admin power
const CreateCard = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body);
    if (!req.files || !req.files.pdfFile) {
      return next(new ErrorHandeler("Please upload a PDF file", 401));
    }
    const file = req.files.pdfFile;
    console.log("req.files.pdfFile", file);
    const filePath = file.tempFilePath;
    console.log("tempFilePath", filePath);
    if (!filePath) {
      return next(new Error("Temporary file path is missing or invalid"));
    }
    const myCloud = await cloudinary.v2.uploader.upload(filePath, {
      folder: "pdf",  // folder name will be WhiteCard when use clinet main id 
      resource_type: "auto",
    });
    console.log("myCloud", myCloud);
    const { title, readTime, tagName } = req.body;
    if (!title || !readTime || !tagName) {
      return next(new ErrorHandeler("plz provide all details", 401));
    }
    const CreateCard = await WhiteCardModel.create({
      title,
      readTime,
      tagName,
      pdfFile: {
        public_id: file.name,
        url: myCloud.secure_url,
      },
    });
    res.status(201).send({
      success: true,
      message: "new card created",
      CreateCard,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// 8. update white card by admin -- admin power

const UpdateCard = async (req, res, next) => {
  try {
    const { Newtitle, NewreadTime, NewtagName } = req.body;

    const newdata = {
      title: Newtitle,
      readTime: NewreadTime,
      tagName: NewtagName,
    };

    const existingCard = await WhiteCardModel.findById(req.params.id);
    if (!existingCard) {
      return next(new ErrorHandeler("Card not found", 404));
    }

    if (req.files && req.files.pdfFile) {
      const file = req.files.pdfFile;
      console.log("req.files.pdfFile", file);

      const filePath = file.tempFilePath;
      console.log("tempFilePath", filePath);

      if (!filePath) {
        return next(new Error("Temporary file path is missing or invalid"));
      }

      if (existingCard.pdfFile && existingCard.pdfFile.public_id) {
        await cloudinary.v2.uploader.destroy(existingCard.pdfFile.public_id, {
          resource_type: "auto",
        });
      }

      const myCloud = await cloudinary.v2.uploader.upload(filePath, {
        folder: "pdf",   // folder name will be WhiteCard when use clinet main id 
        resource_type: "auto",
      });
      console.log("myCloud", myCloud);

      newdata.pdfFile = {
        public_id: file.name,
        url: myCloud.secure_url,
      };
    }

    const updateCard = await WhiteCardModel.findByIdAndUpdate(
      req.params.id,
      newdata,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    if (!updateCard) {
      return next(new ErrorHandeler("Card not updated", 401));
    }

    res.status(200).json({
      success: true,
      message: "Card updated successfully",
      updateCard,
    });
  } catch (error) {
    console.error("the error from update card by admin", error);
    next(error);
  }
};
// 9. delete a card byadmin --admin power

const CardDelete = async (req, res, next) => {
  try {
     const card = await WhiteCardModel.findById(req.params.id);
    if (!card) {
      return next(new ErrorHandeler("Card not found", 404));
     }
    await WhiteCardModel.deleteOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "card delete successfully",
      totalcard: await WhiteCardModel.countDocuments(),
    });
  } catch (error) {
    console.log("error from delete a card", error);
    next(error);
  }
};
// 10. get free consultancy list -- admin power
const GetConsultancy = async (req, res, next) => {
  try {
    const GetList = await FreeconsultancyModel.find({});
    if (!GetList || GetList.length === 0) {
      return next(
        new ErrorHandeler("No free consultancy found or list is empty", 404)
      );
    }
    res.status(200).send({
      message: "Here is the list of those registered for consultation",
      success: true,
      totalRegister: GetList.length,
      list: GetList,
    });
  } catch (error) {
    console.log("the error from GetConsultancy", error);
    next(error);
  }
};

// 11. post upcoming events
const CreateUpcomingEvents = async (req, res, next) => {
  try {
    const { title, eventDate, description } = req.body;
    if (
      !title ||
      !eventDate ||
      !description ||
      !eventDate.day ||
      !eventDate.month ||
      !eventDate.year
    ) {
      return next(new ErrorHandeler("please provide all details", 400));
    }
    const newEvent = await UpcomingEventsModel.create({
      title,
      eventDate,
      description,
    });
    if (!newEvent) {
      return next(new ErrorHandeler("create to new event failed", 500));
    }
    res.status(201).json({
      success: true,
      message: "new event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.log("the error from CreateUpcomingEvents", error);
    next(error);
  }
};
// 12. update upcoming events
const UpdateEvents = async (req, res, next) => {
  try {
    const { Newtitle, NeweventDate, Newdescription, Newlocation } = req.body;
    const FoundEvent = await UpcomingEventsModel.findById(req.params.id);
    if (!FoundEvent) {
      return next(new ErrorHandeler("event not found", 404));
    }
    (FoundEvent.title = Newtitle),
      (FoundEvent.eventDate = {
        day: NeweventDate.day,
        month: NeweventDate.month,
        year: NeweventDate.year,
      });
    FoundEvent.description = Newdescription;
    FoundEvent.location = Newlocation;
    const UpdatedEvent = await FoundEvent.save();
    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: UpdatedEvent,
    });
  } catch (error) {
    console.log("the error from UpdateEvents", error);
    next(error);
  }
};
// 13.  delete upcoming events
const RemoveEvents = async (req, res, next) => {
  try {
    const FoundEvent = await UpcomingEventsModel.findById(req.params.id);
    if (!FoundEvent) {
      return next(new ErrorHandeler("Event not Found", 404));
    }
    // await FoundEvent.remove()
    const EventRemove = await UpcomingEventsModel.deleteOne({
      _id: req.params.id,
    });
    res.status(200).json({
      message: "Event Delete Successfully",
      success: true,
      EventRemove,
    });
  } catch (error) {
    console.log("error from RemoveEvents", error);
    next(error);
  }
};
// 14. german class start post
const CreateGermanClassDate = async (req, res, next) => {
  try {
    const { month, day, time, date } = req.body;
    if (!month || !day || !time || !date) {
      return next(
        new ErrorHandeler(
          "Bad Request: Missing required fields please provide all details",
          400
        )
      );
    }
    const CreateGermanClass = await GermanClassModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "German class date has Created",
      data: CreateGermanClass,
    });
  } catch (error) {
    console.log("error from CreateGermanClassDate", error);
    next(error);
  }
};
// 15. update the class start post
const UpdateGermanClass = async (req, res, next) => {
  try {
    const { Newmonth, Newday, Newtime, Newdate } = req.body;
    const FindGermanClass = await GermanClassModel.findById(req.params.id);
    if (!FindGermanClass) {
      return next(new ErrorHandeler("not found any class", 404));
    }
    FindGermanClass.month = Newmonth;
    FindGermanClass.day = Newday;
    FindGermanClass.time = Newtime;
    FindGermanClass.date = Newdate;
    const UpdateGermanClass = await FindGermanClass.save();

    res.status(200).send({
      success: true,
      message: "German class date has Updated",
      data: UpdateGermanClass,
    });
  } catch (error) {
    console.log("the error from UpdateGermanClass", error);
    next(error);
  }
};
// 16. delete  the class start post
const DeleteGermanClass = async (req, res, next) => {
  try {
    const FindGermanClass = await GermanClassModel.findById(req.params.id);
    if (!FindGermanClass) {
      return next(new ErrorHandeler("class not found", 404));
    }
    await GermanClassModel.deleteOne({_id:req.params.id}); // here i can use deleteOne and findByIdAndRemove
    res.status(200).json({
      message: "German class Delete Successfully",
      success: true,
    });
  } catch (error) {
    console.log("the error from DeleteGermanClass", error);
    next(error);
  }
};
// 17. create german course
const CreateGermanCourse = async (req, res, next) => {
  try {
    const { title, description, totalclass, duration, discount, price } =
      req.body;
    if (!title || !description) {
      return next(
        new ErrorHandeler("please provide title and description", 400)
      );
    }
    const CourseCreate = await GermanCourseModel.create({
      title,
      description,
      totalclass,
      duration,
      discount,
      price,
    });
    res.status(201).json({
      success: true,
      message: "German course created Successfully",
      data: CourseCreate,
    });
  } catch (error) {
    console.log("the error from CreateGermanCourse", error);
    next(error);
  }
};
// 18. update german course
const UpdateGermanCourse = async (req, res, next) => {
  try {
    const { title, description, totalclass, duration, discount, price } =
      req.body;
    const FindGermanCourse = await GermanCourseModel.findById(req.params.id);
    if (!FindGermanCourse) {
      return next(new ErrorHandeler("course not found", 404));
    }
    FindGermanCourse.title = title;
    FindGermanCourse.description = description;
    FindGermanCourse.totalclass = totalclass;
    FindGermanCourse.duration = duration;
    FindGermanCourse.discount = discount;
    FindGermanCourse.price = price;
    await FindGermanCourse.save();
    res.status(200).send({
      message: "German course update Successfully",
      success: true,
      data: FindGermanCourse,
    });
  } catch (error) {
    console.log("the error from UpdateGermanCourse", error);
    next(error);
  }
};
// 19. delete german course
const DeleteGermanCourse = async (req, res, next) => {
  try {
    const FindGermanCourse = await GermanCourseModel.findById(req.params.id);
    if (!FindGermanCourse) {
      return next(new ErrorHandeler("course not found", 404));
    }
    //await FindGermanCourse.remove(); // here i can use deleteOne and findByIdAndDelete 
    await GermanCourseModel.deleteOne({_id:req.params.id})
    res.status(200).json({
      message: "German course Delete Successfully",
      success: true,
    });
  } catch (error) {
    console.log("the error from DeleteGermanCourse", error);
    next(error);
  }
};
// 20. create excel course  (advanced and basic both in one)
const CreateExcelCourse = async (req, res, next) => {
  try {
    const { title, weeklyclass, totalclass, duration, discount, price } =
      req.body;
    if (!title) {
      return next(new ErrorHandeler("please provide title ", 400));
    }
    const CourseCreate = await ExcelCourseModel.create({
      title,
      weeklyclass,
      totalclass,
      duration,
      discount,
      price,
    });
    res.status(201).json({
      success: true,
      message: "Excel course created Successfully",
      data: CourseCreate,
    });
  } catch (error) {
    console.log("the error from CreateExcelCourse ", error);
    next(error);
  }
};
//21. update excel course
const UpdateExcelCourse = async (req, res, next) => {
  try {
    const { title, weeklyclass, totalclass, duration, discount, price } =
      req.body;
    const FindExcelCourse = await ExcelCourseModel.findById(req.params.id);
    if (!FindExcelCourse) {
      return next(new ErrorHandeler("course not found", 404));
    }
    FindExcelCourse.title = title;
    FindExcelCourse.weeklyclass = weeklyclass;
    FindExcelCourse.totalclass = totalclass;
    FindExcelCourse.duration = duration;
    FindExcelCourse.discount = discount;
    FindExcelCourse.price = price;
    await FindExcelCourse.save();
    res.status(200).send({
      message: "Excel course update Successfully",
      success: true,
      data: FindExcelCourse,
    });
  } catch (error) {
    console.log("the error from UpdateExcelCourse", error);
    next(error);
  }
};
//22. delete excel course
const DeleteExcelCourse = async (req, res, next) => {
  try {
    const FindExcelCourse = await ExcelCourseModel.findById(req.params.id);
    if (!FindExcelCourse) {
      return next(new ErrorHandeler("course not found", 400));
    }
    await ExcelCourseModel.deleteOne({_id:req.params.id})
    res.status(200).json({
      message: "Excel course Delete Successfully",
      success: true,
    });
  } catch (error) {
    console.log("the error from DeleteExcelCourse", error);
    next(error);
  }
};
// 23. make excel webniar date
const CreateExcelWebniar = async (req, res, next) => {
  try {
    const { day, date, month, time, webniarurl } = req.body;
    if (!day || !date || !month || !time || !webniarurl) {
      return next(new ErrorHandeler("please provide all details ", 400));
    }
    const WebniarCreate = await ExcelWebniarModel.create({
      day,
      date,
      month,
      time,
      webniarurl,
    });
    res.status(201).json({
      success: true,
      message: "Excel webniar created Successfully",
      data: WebniarCreate,
    });
  } catch (error) {
    console.log("the error from CreateExcelWebniar", error);
    next(error);
  }
};
// 24. update excel webniar date
const UpdateExcelWebniar = async (req, res, next) => {
  try {
    const { day, date, month, time, webniarurl } = req.body;
    const FindExcelWebniar = await ExcelWebniarModel.findById(req.params.id);
    if (!FindExcelWebniar) {
      return next(new ErrorHandeler("webniar not found", 400));
    }
    FindExcelWebniar.day = day;
    FindExcelWebniar.date = date;
    FindExcelWebniar.month = month;
    FindExcelWebniar.time = time;
    FindExcelWebniar.webniarurl = webniarurl;

    await FindExcelWebniar.save();
    res.status(200).send({
      message: "Excel webniar update Successfully",
      success: true,
      data: FindExcelWebniar,
    });
  } catch (error) {
    console.log("the error from UpdateExcelWebniar ", error);
    next(error);
  }
};
// 25. delete excel webniar date
const DeleteExcelWEbniar = async (req, res, next) => {
  try {
    const FindExcelWebniar = await ExcelWebniarModel.findById(req.params.id);
    if (!FindExcelWebniar) {
      return next(new ErrorHandeler("webniar not found", 404));
    }
        await  ExcelWebniarModel.deleteOne({_id:req.params.id})
    res.status(200).json({
      message: "Excel webniar Delete Successfully",
      success: true,
    });
  } catch (error) {
    console.log("the error from DeleteExcelWEbniar", error);
    next(error);
  }
};
// 26. get excel webniar register list

const GetExcelWebniarRegisterList = async (req, res, next) => {
  try {
    const FindExcelWebniarRegisterList = await ExcelWebniarRegisterModel.find(
      {}
    );
    if (
      !FindExcelWebniarRegisterList ||
      FindExcelWebniarRegisterList.length === 0
    ) {
      return next(
        new ErrorHandeler(" Excel Webniar  register list empty", 401)
      );
    }
    res.status(200).json({
      success: true,
      message: "there is all excel webniar register list",
      totalRefgister: FindExcelWebniarRegisterList.length,
      data: FindExcelWebniarRegisterList,
    });
  } catch (error) {
    console.log("the error from FindExcelWebniarRegisterList", error);
    next(error);
  }
};

module.exports = {
  UserDetailsAll,
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
  CreateGermanClassDate,
  UpdateGermanClass,
  DeleteGermanClass,
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
};
