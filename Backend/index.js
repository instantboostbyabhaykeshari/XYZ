const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./Config/Database.js");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const { cloudinaryConnect } = require("./Config/Cloudinary.js");
cloudinaryConnect();

const cookieParser = require("cookie-parser");
app.use(cookieParser());


const dotenv = require("dotenv");
dotenv.config();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads/tmp/", // Ensure this directory exists
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
    abortOnLimit: true, // Stop processing if file exceeds limit
    createParentPath: true, // Automatically create directories if they don't exist
  })
);
app.use(cors());

//DataBase connection
database.connect();

//Routes import
const userRoutes = require("./Routes/userRoutes.js");
const categoryRoutes = require("./Routes/categoryRoutes.js");
const foodItemRoutes = require("./Routes/foodItemRoutes.js");
const paymentRoutes = require("./Routes/Payment.js");
const orderRoutes = require("./Routes/orderRoutes.js");

app.use("/api/v1", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/food-items", foodItemRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/order", orderRoutes);

app.get("/", (req, res) => {
    res.send("Hello, I am BiteTasty.");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port} successfully.`);
});