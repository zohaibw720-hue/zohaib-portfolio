
const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is missing from .env");
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 15000,
    family: 4,
  });

  console.log("MongoDB Atlas connected successfully");
}

module.exports = connectDB;
