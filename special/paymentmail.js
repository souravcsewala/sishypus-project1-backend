const nodemailer = require("nodemailer");

const sendPaymentSuccessEmail = (email, courseTitle, transactionId) => {
  const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    requireTLS:true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Payment Confirmation",
    text: `Thank you for your payment! thanks for buy our ${courseTitle} courses , you now show student dashboard buttuon, Your transaction ID is: ${transactionId}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent successfully:", info.response);
    }
  });
};

module.exports={sendPaymentSuccessEmail}