const CourseModel = require("../models/CourseModel"); 
const ErrorHandelar = require("../special/errorHandelar"); 

//!1. Get faculty courses by email
const GetFacultyCourse = async (req, res) => {
  const { email } = req.query; 
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Faculty email is required",
    });
  }
  try {
      const courses = await CourseModel.find({
      "aboutFaculty.email": email,
    }).select("title image description duration price discountprice classes");
       if (!courses || courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found for this faculty email",
      });
    }
      res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("Error fetching courses for faculty:", error);

  }
};

//!2. get faculty under course class --- faculty 

const GetFacultyunderCourseClass = async (req, res) => {
      try {
        const course = await CourseModel.findById(req.params.id);
        if (!course) {
          return res.status(404).json({
            success: false,
            message: "Course not found",
          });
        }
        res.status(200).json({ success: true, data: course });
      } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({
          success: false,
          message: "Failed to fetch course class faculty",
          error: error.message,
        });
      }
    };

//!3. add class by faculty --- faculty 

const AddClassByFaculty= async (req, res) => {
      const { id } = req.params;
      const {
        title,
        description,
        classJoinLink,
        classType,
        date,
        time,
        NotesUrl,
        RecordVideoUrl,
      } = req.body;
    
      try {
       
        if (!title || !description || !classType) {
          return res.status(400).json({ error: "Missing required fields" });
        }
        
        const course = await CourseModel.findById(id);
        if (!course) {
          return res.status(404).json({ error: "Course not found" });
        }
       
        const newClass = {
          title,
          description,
          classJoinLink,
          classType,
          date: classType === "upcoming" ? date : null,
          time: classType === "upcoming" ? time : null,
          NotesUrl: classType === "recorded" ? NotesUrl : null,
          RecordVideoUrl: classType === "recorded" ? RecordVideoUrl : null,
        };
            
        course.classes.push(newClass);
        await course.save();
    
        res.status(201).json({ message: "Class added successfully", data: newClass });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add class" });
      }
    };

//!4. delete a class under a particular course--- facultyu 

const DeleteClassUnderCourse = async (req, res) => {
  try {
    const { classId, courseId } = req.params;

    
    const course = await CourseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    
    const result = await CourseModel.updateOne(
      { _id: courseId },
      { $pull: { classes: { _id: classId } } }
    );

   
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Class not found or already deleted" });
    }

    
    return res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    console.error("Error deleting class under course faculty", error);
    return res.status(500).json({ message: "Error deleting class" });
  }
};

//!5. get class details --- faculty 

const getClassDetails = async (req, res) => {
  try {
    const { courseId, classId } = req.params;

   
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    
    const classDetails = course.classes.id(classId); 
    if (!classDetails) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ data: classDetails });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//!6. edit the class details --- faculty 
const updateClass = async (req, res) => {
  try {
    const { courseId, classId } = req.params;

    
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const classDetails = course.classes.id(classId);
    if (!classDetails) {
      return res.status(404).json({ message: "Class not found" });
    }

   
    const {
      title,
      description,
      classJoinLink,
      classType,
      date,
      time,
      NotesUrl,
      RecordVideoUrl,
    } = req.body;

    classDetails.title = title || classDetails.title;
    classDetails.description = description || classDetails.description;
    classDetails.classJoinLink = classJoinLink || classDetails.classJoinLink;
    classDetails.classType = classType || classDetails.classType;
    classDetails.date = date || classDetails.date;
    classDetails.time = time || classDetails.time;
    classDetails.NotesUrl = NotesUrl || classDetails.NotesUrl;
    classDetails.RecordVideoUrl = RecordVideoUrl || classDetails.RecordVideoUrl;

    
    await course.save();

    res.status(200).json({ message: "Class updated successfully", data: classDetails });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};










module.exports = { GetFacultyCourse ,GetFacultyunderCourseClass,
  AddClassByFaculty,
  DeleteClassUnderCourse,
  getClassDetails,
  updateClass};
