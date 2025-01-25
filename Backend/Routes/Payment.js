// Import the required modules
const express = require("express");
const router = express.Router();
const {
  captureOrderPayment,
  verifyOrderPayment,
  sendOrderSuccessEmail,
} = require("../Controllers/Payments");

const { auth } = require("../Middlewares/authorization.js");

// Capture payment route (Only authenticated customers can place orders)
router.post("/capturePayment", auth, captureOrderPayment);

// Verify payment route
router.post("/verifyPayment", auth, verifyOrderPayment);

// Send order success email
router.post("/sendPaymentSuccessEmail",auth, sendOrderSuccessEmail);

module.exports = router;