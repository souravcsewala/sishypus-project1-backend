
const OrderModel= require("../models/OrderModel");
const UserModel=require("../models/userModel");
const ErrorHandeler = require("../special/errorHandelar");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const {sendPaymentSuccessEmail}=require("../special/paymentmail")
//! 1. send razopay key id to the fronted 

   exports.SendRazoPayKey=async(req,res,next)=>{
       try{
           const RazoPayKey=process.env.RAZORPAY_KEY_ID
                   if(!RazoPayKey){
                     return next( new ErrorHandeler("razopaykey not found",400))
                   }
               res.status(200).json({
                 success:true,
                 message:"this is the Razopay Key",
                 key:RazoPayKey
               })
       }catch(error){
        console.error("Error fetching Razorpay key:", error);
        next(error)
        
       }
  }

//!2. create order 

exports.createOrder = async (req, res,next) => {
    try {
      const { amount, currency, courseId, userId } = req.body;
  
      if (!userId || !courseId) {
        return  next(new ErrorHandeler("userid and courseId  not found", 400))
      }

        //!  i add here a beatuful logic if any user click on the enroll btn but not paymeny then again click on the enroll not create again order
      const existingOrder = await OrderModel.findOne({
        userId,
        courseId,
        paymentStatus: "pending",
      });
         
      if (existingOrder) {
        return res.status(200).json({
          success: true,
          message:"you already crate order before,you just to payment",
          order: {
            id: existingOrder.orderId,
            amount: existingOrder.amount,
            currency: existingOrder.currency,
          },
        });
      }
      
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
      });
  
      //* Create Razorpay order
      const options = {
        amount,
        currency,
        receipt: `receipt_${Date.now()}`,
      };
  
      const razorpayOrder = await razorpay.orders.create(options);
  
      
      const newOrder = new OrderModel({
        userId,
        courseId,
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        paymentStatus: "pending", //* i set Default status
      });
  
      await newOrder.save();
  
      res.status(201).json({ success: true, order: razorpayOrder });
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      res.status(500).json({ success: false, message: "Failed to create order" });
    }
  };

  //! 3.  cheak  payment success verify and update the database       
  exports.verifyPayment = async (req, res,next) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId,email,courseTitle } = req.body;

      console.log("Razorpay Order ID:", razorpay_order_id);
console.log("Razorpay Payment ID:", razorpay_payment_id);
console.log("Razorpay Signature:", razorpay_signature);

  
      //* Step 1: Validate Razorpay signature
      const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");
  
      if (generatedSignature !== razorpay_signature) {
        return next (new ErrorHandeler("invalid payment signature",400))
      }
  
      //* Step 2: Update payment status and transaction ID in the database
      const order = await OrderModel.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { paymentStatus: "paid",
          transactionId: razorpay_payment_id,
           
           },
        { new: true }
      );
  
      if (!order) {
        return next (new ErrorHandeler("order not found",400))
      }
  
      //* Step 3: Update user details ( add course to `buyCourse` and change the role from user to student)
    const user=  await UserModel.findByIdAndUpdate(order.userId, {
        $addToSet: { Buycourses: courseId },
        $set: { role: "student" },
      });
            if(!user){
                return next (new ErrorHandeler("add courseid to buycourse and role to student fail",400))
            }
           //* now i sent email to the user to info him payment success
           sendPaymentSuccessEmail(email,courseTitle, razorpay_payment_id);

      res.status(200).json({ success: true, message: "Payment verified successfully", order });

    } catch (error) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ success: false, message: "Failed to verify payment" });
    }
  };
  
  
  
  
  
  

