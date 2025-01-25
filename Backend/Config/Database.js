const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Database connected successfully.");
    })
    .catch((err) => {
      console.log(err);
      console.log("Database connection failed.");
      process.exist(1);
    });
};

