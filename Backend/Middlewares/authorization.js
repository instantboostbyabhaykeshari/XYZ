const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.auth = (req, res, next) => {
    try{
        //Fetch token
        const token = req.cookies.token || req.body.token || req.header("Authorization") && req.header("Authorization").replace("Bearer ", "");

        if(!token || token === undefined){
            return res.status(401).json({
                success: false,
                message: "Token missing."
            });
        }

        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }catch(err){
            console.log(err);
            return res.status(402).json({
                success: false,
                message: "Token are wrong."
            });
        }

        next();
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong, while fetching token."
        });
    }
}