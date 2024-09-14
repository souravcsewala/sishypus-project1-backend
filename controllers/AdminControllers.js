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
      totalRegisteredUsers: users.length,
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
    const instructors = await UserModel.find({ role: "faculty" });
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
    const { name, email, facultysubject } = req.body;
    const newUpdateByAdmin = {
      name,
      email,
      facultysubject
      
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
      message: "heey admin faculty update succesfully",
      success: true,
      UpdateInstructorAdmin,
    });
  } catch (error) {
    console.log(`this error from faculty update by admin ${error}`);
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
    const { name, email, role, facultysubject } = req.body;
    const newUpdateByAdmin = {
      name: name,
      email: email,
      role: role,
      facultysubject:facultysubject
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
      folder: "pdf",
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
    const { title, readTime, tagName } = req.body;

    const newdata = {
      title: title,
      readTime: readTime,
      tagName: tagName,
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
        folder: "pdf",
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
       GetList,
    });
  } catch (error) {
    console.log("the error from GetConsultancy", error);
    next(error);
  }
};

// 11. post upcoming events
const CreateUpcomingEvents = async (req, res, next) => {
  try {
    const { title, date, description, location, time, image } = req.body; // Note: `date` is now a single field

   
    if (!title || !date || !description || !location || !time ) {
      return next(new ErrorHandeler("Please provide all details", 400));
    }

    
    const eventDate = new Date(date);
    if (isNaN(eventDate)) {
      return next(new ErrorHandeler("Invalid event date provided", 400));
    }

    
    const newEvent = await UpcomingEventsModel.create({
      title,
      eventDate,
      description,
      location,
      time,
      image,
    });

  
    if (!newEvent) {
      return next(new ErrorHandeler("Failed to create new event", 500));
    }

    
    res.status(201).json({
      success: true,
      message: "New event created successfully",
      newEvent,
    });
  } catch (error) {
    console.log("Error from CreateUpcomingEvents:", error);
    next(error);
  }
};

// 12. update upcoming events
const UpdateEvents = async (req, res, next) => {
  try {
    // Destructure the required fields from the request body
    const { title, eventDate, description, location, time, image } = req.body;

    // Find the event by its ID
    const foundEvent = await UpcomingEventsModel.findById(req.params.id);

    // Check if the event exists
    if (!foundEvent) {
      return next(new ErrorHandeler("Event not found", 404));
    }

    // Update the fields if provided in the request
    if (title) foundEvent.title = title;
    if (eventDate) {
      const newEventDate = new Date(eventDate); // Use a different variable name
      if (isNaN(newEventDate)) {
        return next(new ErrorHandeler("Invalid event date provided", 400));
      }
      foundEvent.eventDate = newEventDate;
    }
    if (description) foundEvent.description = description;
    if (location) foundEvent.location = location;
    if (time) foundEvent.time = time;
    if (image) foundEvent.image = image;

    // Save the updated event
    const updatedEvent = await foundEvent.save();

    // Send success response
    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      updatedEvent,
    });
  } catch (error) {
    console.log("Error from UpdateEvents:", error);
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
    const {image, title, description, totalclass, duration, discount, price } =
      req.body;
    if (!title || !description) {
      return next(
        new ErrorHandeler("please provide title and description", 400)
      );
    }
    const imageUrl = image && image.trim() !== "" ? image : "https://media.istockphoto.com/id/1096979810/vector/german-hand-drawn-doodles-and-lettering.jpg?s=1024x1024&w=is&k=20&c=w-w7fSqFR2eNXR4cK9qrDrnCIrHP2M4IErHlqG-K1YU=";
    const CourseCreate = await GermanCourseModel.create({
      title,
      description,
      totalclass,
      duration,
      discount,
      price,
      image: imageUrl
      
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
    const {image, title, description, totalclass, duration, discount, price } =
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
    FindGermanCourse.image = image;
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
    const { image,title, weeklyclass, totalclass, duration, discount, price } =
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
      image
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
    const {image, title, weeklyclass, totalclass, duration, discount, price } =
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
    FindExcelCourse.image = image;
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

//27. delete user by admin 
const RemoveUser = async (req, res, next) => {
  try {
    const findUser = await UserModel.findById(req.params.id);
    if (!findUser) {
      return next(new ErrorHandeler("oops! user not found", 404));
    }
    const userDelete = await UserModel.deleteOne({ _id: req.params.id });
    //    const instructorsNumber=await UserModel.find({role:"instructor"});
    const UserCount = await UserModel.countDocuments({
      role: "user",
    });
    res.status(200).json({
      message: "user delete succesfully",
      userDelete,
      NumberofUser: UserCount
    });
  } catch (error) {
    console.log(`the error from RemoveInstructor ${error}`);
    next(error);
  }
};
// 28. get  user details by admin ... 
const getUserdetails=async(req,res,next)=>{
  try{
        const Userdetails= await UserModel.findById(req.params.userId);
               if(!Userdetails){
                     return next(new ErrorHandeler("you can not access this without login,first login",401))
               }
                  res.status(200).json({
                      message:"here user details",
                      success:true,
                      Userdetails
                  })
  }catch(error){
      console.log(`the error is from get user details ${error}`)
      next(error)
  }
}

//29. get faculty details by admin 
const getFacultydetails=async(req,res,next)=>{
  try{
        const  Facultydetails= await UserModel.findById(req.params.facultyId);
               if(!Facultydetails){
                     return next(new ErrorHandeler("you can not access this without login,first login",401))
               }
                  res.status(200).json({
                      message:"here faculty details",
                      success:true,
                      Facultydetails
                  })
  }catch(error){
      console.log(`the error is from get user details ${error}`)
      next(error)
  }
}

//30. update the status of consult 
const updateConsultStatus=async(req,res,next)=>{
       try{
        const consultId=req.params.consultId
        const updatedConsultation = await FreeconsultancyModel.findByIdAndUpdate(
          consultId,
          { seen: true },
          { new: true } 
        );
         if(!updatedConsultation){
          return next(new ErrorHandeler("consult not found",401))
         }
         res.status(200).json({
          message:"status update successfully",
          success:true,
      updatedConsultation
      })
       }catch(error){
        console.log(`the error is from update status consult ${error}`)
        next(error)
    }
}
//31. get consult details 
 const getconsultdetails=async(req,res,next)=>{
        try{
          const consultId=req.params.consultId;
          const consultdetails=await FreeconsultancyModel.findById(consultId)
          if(!consultdetails){
            return next(new ErrorHandeler("consult details not found",401))
      }
         res.status(200).json({
             message:"here consult details",
             success:true,
             consultdetails
         })
        }catch(error){
          console.log(`the error is from get details consult ${error}`)
          next(error)
        }
 }

 //32. consult delete by admin 
    const RemoveConsult=async(req,res,next)=>{
           try{
            const consultId=req.params.consultId;
            const findConsult = await FreeconsultancyModel.findById(consultId);
            if (!findConsult) {
              return next(new ErrorHandeler("oops! consult not found", 404));
            }
            const ConsultDelete = await FreeconsultancyModel.deleteOne({ _id: consultId });
            res.status(200).json({
              message:"consult delete successfully",
              success:true,
              ConsultDelete
          })
           }catch(error){
            console.log(`the error is from delete consult ${error}`)
              next(error)
           }
    }

    //?33. update message seen status 
      const  updateMessagestatus=async(req,res,next)=>{
            try{
                 const MessageId=req.params.MessageId;
                 const FindMessage= await ContactModel.findById(MessageId)
                    if(!FindMessage){
                       return next(new ErrorHandeler("message not found",404)) 
                    }
                    const updatedMessageStatus = await ContactModel.findByIdAndUpdate(
                      MessageId ,
                      { seen: true },
                      { new: true } 
                    );
                      res.status(200).json({
                      message:"message status update" ,
                      success:true,
                      updatedMessageStatus
                      })
                     
            }catch(error){
               console.log("this is error from update message status",error)
               next(error)
            }
      }  

      //?  34. get message details 
      const GetMessageDetails=async(req,res,next)=>{
             try{
              const MessageId=req.params.MessageId;
               const MessgaDetails= await ContactModel.findById(MessageId);
               if(!MessgaDetails){
                   return next(new ErrorHandeler("message not found",404))
               }
                 res.status(200).json({
                  message:" Here message details",
                  success:true,
                  MessgaDetails
                 })
             }catch(error){
               console.log("nthis is error from message details",error)
                next(error)
             }
      }
    //? 35 remove the message 

       const RemoveMessge=async(req,res,next)=>{
             try{
              const MessageId=req.params.MessageId;
               const FindMessage= await ContactModel.findById(MessageId);
                    if(!FindMessage){
                       return next (new ErrorHandeler("message not found",404))
                    }
                    const MessageDelete = await ContactModel.deleteOne({ _id:MessageId  });
            res.status(200).json({
              message:"message delete successfully",
              success:true,
             MessageDelete
          })   
             }catch(error){
                console.log("this is error from message delete",error)
                next(error)
             }
       } 
    //? 36. update the event status 
    const  updateEventstatus=async(req,res,next)=>{
      try{
           const EventId=req.params.EventId;
           const FindEvent= await UpcomingEventsModel.findById(EventId)
              if(!FindEvent){
                 return next(new ErrorHandeler("Event not found",404)) 
              }
              const updatedEventStatus = await UpcomingEventsModel.findByIdAndUpdate(
                EventId ,
                { completed: true },
                { new: true } 
              );
                res.status(200).json({
                message:"Event status update" ,
                success:true,
                updatedEventStatus
                })
               
      }catch(error){
         console.log("this is error from update message status",error)
         next(error)
      }
} 

//? 37. get  the events details 
const getEventdetails=async(req,res,next)=>{
  try{
        const  Eventdetails= await UpcomingEventsModel.findById(req.params.EventId);
               if(!Eventdetails){
                     return next(new ErrorHandeler("Event not found",401))
               }
                  res.status(200).json({
                      message:"here event details",
                      success:true,
                      Eventdetails
                  })
  }catch(error){
      console.log(`the error is from get event details ${error}`)
      next(error)
  }
}
//? 38. get excel course details 
const getExceldetails=async(req,res,next)=>{
  try{
        const  Exceldetails= await ExcelCourseModel.findById(req.params.ExcelId);
               if(!Exceldetails){
                     return next(new ErrorHandeler("Excel not found",401))
               }
                  res.status(200).json({
                      message:"here excel course details",
                      success:true,
                      Exceldetails
                  })
  }catch(error){
      console.log(`the error is from get excel course details ${error}`)
      next(error)
  }
}
//? 39. get german couse details 
const getGermandetails=async(req,res,next)=>{
  try{
        const  Germandetails= await GermanCourseModel.findById(req.params.Id);
               if(!Germandetails){
                     return next(new ErrorHandeler("german not found not found",401))
               }
                  res.status(200).json({
                      message:"here german course details",
                      success:true,
                      Germandetails
                  })
  }catch(error){
      console.log(`the error is from get german course details ${error}`)
      next(error)
  }
}
//? 40. get card details 
const getCarDdetails=async(req,res,next)=>{
  try{
        const  CardDetails= await WhiteCardModel.findById(req.params.Id);
               if(!CardDetails){
                     return next(new ErrorHandeler("card not found not found",401))
               }
                  res.status(200).json({
                      message:"here card details",
                      success:true,
                       CardDetails
                  })
  }catch(error){
      console.log(`the error is from card details ${error}`)
      next(error)
  }
}
  
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
  RemoveUser,
  getUserdetails,
  getFacultydetails,
  updateConsultStatus,
  getconsultdetails,
  RemoveConsult,
  updateMessagestatus,
  GetMessageDetails,
  RemoveMessge,
  updateEventstatus,
  getEventdetails,
  getExceldetails,
  getGermandetails,
  getCarDdetails
};
