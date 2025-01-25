const mongoose = require("mongoose");

//Create profile schema
const profileSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true, //Trim white space from end
        default: "User Name"
    },
    userEmail: {
        type: String,
        required: true,
        trim: true
    },
    userPhoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    userProfilePicture: {
        type: String,
        default: "https://api.dicebear.com/9.x/initials/svg?seed=UserName"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", profileSchema);
module.exports = User;
