require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.mongo_uri);
    console.log("Mongo db connected successfully !!");
  } catch (error) {
    console.log("Error connection mongodb, ", error);
  }
}

module.exports = connectDB;
