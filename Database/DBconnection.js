const mongoose = require("mongoose");

const dbUrl = process.env.MONGODB_URL;

const DataBaseconnection = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log(`Database is connected to ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`the problem from database ${error}`);
  }
};
module.exports = { DataBaseconnection };
