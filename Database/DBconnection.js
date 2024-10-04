const mongoose = require("mongoose");

const dbUrl = process.env.MONGODB_URL_Test;
  console.log('dbUrl:', dbUrl);
const DataBaseconnection = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log(`Database is connected to ${mongoose.connection.host}`.bgMagenta.bold.underline);
  } catch (error) {
    console.log(`the problem from database ${error}`);
  }
};
module.exports = { DataBaseconnection };
