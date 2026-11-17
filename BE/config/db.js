const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  });
}

module.exports = connectDB;
