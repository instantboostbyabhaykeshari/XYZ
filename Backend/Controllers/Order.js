const Order = require("../Models/Order.js");


exports.orderStatus = async(req, res) => {
    try{
        const {email} = req.body;
        console.log("Order api email: ", email);
        if(!email){
            return res.status(402).json({
                status: false,
                message: "Email not found in req.body.email."
            });
        }
        const foodOrder = await Order.find({email: email, isDelivered: true}).populate({path: "foodItem", path: "user"}).exec();
        const fetchRecentOrders = await Order.find({email: email, isDelivered: false}).populate({path: "items", path: "user"}).exec();

        console.log("Ordered: ", fetchRecentOrders);

        console.log("All order: ", foodOrder);
        return res.status(200).json({
            success: true,
            message: "All orders found successfully.",
            foodOrder,
            fetchRecentOrders
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error in fetching all orders."
        });
    }
}