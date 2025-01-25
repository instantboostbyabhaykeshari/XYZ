const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const User = require("../Models/User.js");
const OTP = require("../Models/OTP.js");
const mailSender = require("../utils/mailSender.js");

//Send OTP
exports.sendOTP = async(req, res) => {
    try{
        //Fetch email from req.body
        const {email} = req.body;
        req.user = email;

        //Validation on email
        if(!email){
            return res.status(401).json({
                success: false,
                message: "Please enter valid email."
            });
        }

        //Generate OTP
        const otp = otpGenerator.generate(6,{
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        });

        console.log("OTP is: ", otp);

        //Create entry for OTP in DB
        const otpBody = OTP.create({email, otp});
        console.log(otpBody);

        //Send successful response
        return res.status(201).json({
            success: true,
            message: "OTP Send on email successfully."
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to send OTP on email."
        });
    }
}

//SignUp
exports.signUp = async(req, res) => {
    try{
        //Fetch data from req.body
        const {email, phoneNumber, otp} = req.body;

        //Validation on email and phoneNumber
        if(!email || !phoneNumber){
            return res.status(403).json({
                success: false,
                message: "Enter all the required details."
            });
        }

        console.log("Email:", email);

        // Find most recent OTP
        const recentOtp = await OTP.findOne({email}).sort({createdAt: -1});
        // console.log("Recent otp is: ", recentOtp.otp);

        //Verify OTP
        if(!recentOtp){
            return res.status(401).json({
                success: false,
                message: "OTP not found in DB."
            });
        }

        if(otp !== recentOtp.otp){
            return res.status(404).json({
                success: false,
                message: "Please enter the correct otp."
            });
        }

        const payload = {
            email: email,
            phoneNumber: phoneNumber
        }

        req.user = payload;

        //Generate token for future
        let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "24h"
        });

        const options = {
            expires: new Date(Date.now() + 3*24*60*60),
            httpOnly: true
        }

        

        //Save email and phoneNo in user model
        const userDataSave = await User.create({userEmail: email, userPhoneNumber: phoneNumber});
        console.log(userDataSave);

        //Save userId in req.user
        const userId = (await User.find({userEmail: email}).sort({createdAt: -1}).limit(1))[0]._id;
        console.log("Sign uer id: ", userId);
        req.user = userId;
        console.log("SignUp req.user", req.user);

        //Send successful response
        return res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            message: "User signing up successfully."
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "There is internal server in signing up."
        });
    }
}

exports.getEmailPhoneNumber = (req, res) => {
    const email = req.user.email;
    const phoneNumber = req.user.phoneNumber;
    console.log(email, phoneNumber);
}