const UserModel = require("../models/userModel");
const ErrorHandeler = require("../special/errorHandelar");
const CourseModel = require("../models/CourseModel"); 
const Order = require("../models/OrderModel"); 

//! 1. get spesific user enrolled course 

exports.getEnrolledCourses = async (req, res,next) => {
    try {
      const { userId } = req.params; 
  
      
      const user = await UserModel.findById(userId).populate('Buycourses');
      if (!user) {
        return next(new ErrorHandeler("user not found", 400))
      }
      
      const enrolledCourses = user.Buycourses;

        if (enrolledCourses.length === 0) {
        return next(new ErrorHandeler("no course for this user", 400));
      }
  
     
      res.status(200).json({
        success:true,
        message:"here is the user get enrolled course",
        enrolledCourses

      });
    } catch (error) {
      console.error("error get from user get enrolled course",error);
      res.status(500).json({ message: 'Server error' });
    }
  };    

//! 2. get the enrolled course's class list 
 
exports.getCourseClasses = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course = await CourseModel.findById(courseId).select("classes");
    if (!course) {
        return next(new ErrorHandeler("course not found", 400))
    }
    
    const pastClasses = course.classes.filter((cls) => cls.classType === "recorded");
    const upcomingClasses = course.classes.filter((cls) => cls.classType === "upcoming");

    res.status(200).json({
      success: true,
      message: "Classes fetched successfully",
      pastClasses,
      upcomingClasses,
    });
  } catch (error) {
    console.error("Error fetching course classes:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};   

//! 3. get the student's payment status 
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.userid; 
    const orders = await Order.find({ userId })
      .populate("courseId", "title image price discount")
      .exec();

    if (!orders) {
      return res.status(404).json({ success: false, message: "No orders found" });
    }

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};   


//! 4. get download the student payment and order details 
exports.getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params; 
   
    const order = await Order.findById(orderId)
      .populate("courseId", "title image price discount") 
      .exec();

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      order, 
    });
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};





  






  