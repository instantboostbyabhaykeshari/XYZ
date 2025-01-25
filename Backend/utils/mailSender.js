const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

//Send Mail function
const mailSender = async(email, title, body) => {
    try{
        //Crete transporter using createTransport Method
        let transporter = nodeMailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        //Send info onto the mail
        let info = await transporter.sendMail({
            from: "Bite Tasty",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        });

        console.log(info);
        return info

    }catch(err){
        console.log(err);
        console.log("Email Send failed.");
    }
}

module.exports = mailSender;