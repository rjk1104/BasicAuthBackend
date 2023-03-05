const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection succeeded.");
  } catch (error) {
    console.log(`Error occured : ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
