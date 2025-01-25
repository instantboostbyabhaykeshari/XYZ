const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const {OTPVerificationEmail} = require("../mailTemplates/OTPVerificationTemplate.js");

//Schema fot otp
const otpSchema = new mongoose.Schema({
    email: {
        type: String
    },
    otp: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now().toString(),
        expires: 10*60
    }
});

async function sendVerificationEmail (email, otp) {
    try{
        const mailResponse = await mailSender(email, "Bite-Tasty Verification OTP", OTPVerificationEmail(email, otp));
        console.log("Email verification otp send successfully.",mailResponse);
    }catch(err){
        console.log(err);
        console.log("Something wrong while sending otp.");
        throw err;
    }
}

otpSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
});


const OTP = mongoose.model("OTP", otpSchema);
module.exports = OTP;