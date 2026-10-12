
const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is missing from .env");
  }

  await mongoose.connect(uri, {
    dbName: "portfolio_db",
    serverSelectionTimeoutMS: 15000,
    family: 4,
  });

  console.log(
    `MongoDB Atlas connected successfully: ${mongoose.connection.name}`
  );
}

module.exports = connectDB;
