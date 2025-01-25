const { instance } = require("../Config/razorpay.js");
const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Order = require("../Models/Order");
const User = require("../Models/User");
const mailSender = require("../utils/mailSender.js");
const { orderConfirmationEmail } = require("../mailTemplates/orderConfirmationEmail.js");
const { paymentSuccessEmail } = require("../mailTemplates/paymentSuccessEmail.js");

// Capture the payment and initiate the Razorpay order
exports.captureOrderPayment = async (req, res) => {
  console.log(req.body)
  const { foodItems, totalAmount } = req.body;

  // Validate order details
  if (!foodItems || foodItems.length === 0) {
    return res.json({ success: false, message: "Please provide food foodItems." });
  }

  try {
    // Create Razorpay payment order
    const options = {
      amount: totalAmount * 100, // Convert amount to paisa
      currency: "INR",
      receipt: `order_${Date.now()}`,
    };

    const paymentResponse = await instance.orders.create(options);
    console.log("Razorpay Order Response:", paymentResponse);

    res.json({ success: true, data: paymentResponse });
  } catch (error) {
    console.log("ORDER PAYMENT ERROR: ", error);
    res.status(500).json({ success: false, message: "Could not initiate order." });
  }
};

// Verify the payment
exports.verifyOrderPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, foodItems, totalAmount } = req.body.bodyData;
  // const userId = req.user?.id;
  // console.log("Abhay",razorpay_order_id, razorpay_payment_id, razorpay_signature, foodItems, totalAmount);

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !foodItems ) {
    return res.status(400).json({ success: false, message: "Payment verification failed." });
  }

  // Generate signature
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body).digest("hex");

  if (expectedSignature === razorpay_signature) {

    //Payment Successuful Token generate
    const paymentPayload = {
      razorpaySignature: razorpay_signature
    }
    const successfulPaymentToken = jwt.sign(paymentPayload, process.env.JWT_PAYMENT_SECRET);
    console.log("Successful payment token: ", successfulPaymentToken);


    // await processOrder(foodItems, totalAmount);
    try {
      // Create new order in the database
      // console.log("User Id in verify payment: ", req.user);
      const userId = (await User.find({userEmail: req.user.email}).sort({createdAt: -1}).limit(1))[0]._id;
      const newOrder = await Order.create({
        user: userId,
        email: req.user.email,
        items: foodItems.map((item) => ({
          foodItem: item.foodItemName,
          quantity: item.quantity,
          price: item.foodItemPrice,
        })),

        totalAmount,
        paymentMethod: "Credit Card",  // Assuming Razorpay method
        paymentStatus: "Paid",
        status: "Processing",
        shippingAddress: {
          street: "123 Foodie Street",
          city: "Foodville",
          state: "Tastyland",
          zipCode: "12345",
          country: "India",
        },
      });
  
      // Update user's order history
      await User.findOneAndUpdate({email: req.user.email}, {
        $push: { orders: newOrder._id },
      });
  
      // Send order confirmation email
      const customer = await User.find({email: req.user.email});
      console.log("object:before mail ",customer);
      await mailSender(
        req.user.email,
        `Order Confirmation #`,
        orderConfirmationEmail("Guest", "ajhjsh")
      );
  
      console.log("object: ",customer);
  
      console.log("Order placed successfully:", newOrder);
    } catch (error) {
      console.log("ORDER PROCESSING ERROR:", error);
      return res.status(500).json({ 
        success: false,
        message: "Could not process order." 
      });
    }
    return res.status(200).json({ 
      success: true,
      message: "Payment verified.",
      successfulPaymentToken
     });
  }

  return res.status(400).json({ success: false, message: "Invalid payment signature." });
};

// Send Payment Success Email
exports.sendOrderSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;
  // const userId = req.user.id;

  if (!orderId || !paymentId || !amount ) {
    return res.status(400).json({ success: false, message: "Please provide all payment details." });
  }

  try {
    const customer = await User.find({email: req.user.email});

    console.log("Customer sendOrderSuccessEmail", customer);
    await mailSender(
      req.user.email,
      "Payment Received",
      paymentSuccessEmail("Guest", amount / 100, orderId, paymentId)
    );

    res.status(200).json({ success: true, message: "Payment confirmation email sent." });
  } catch (error) {
    console.log("EMAIL ERROR: ", error);
    res.status(500).json({ success: false, message: "Could not send payment email." });
  }
};












// // Process order and update database
// const processOrder = async (foodItems, totalAmount) => {
  
// };