const sendToken = (user, statuscode, res) => {
  const token = user.getJwtToken();
  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 // cookie expire time 24hours * 7
    ),
    httpOnly: true,
  };

  res.status(statuscode).cookie("token", token, options).json({
    success: true,
    message: "login successfully",
    user,
    token,
  });
};
module.exports = sendToken;
