const express = require("express");
const router = express.Router();

const {sendOTP, signUp, getEmailPhoneNumber} = require("../Controllers/auth.js");

router.post("/sendOtp", sendOTP);
router.post("/signUp", signUp);

router.get("/profile", getEmailPhoneNumber);

module.exports = router;
