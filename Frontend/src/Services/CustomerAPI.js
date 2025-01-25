import { toast } from "react-hot-toast";
import rzpLogo from "../assets/images/logo-png.png";
import apiConnector  from "../Services/apiConnector.js";
import { setSuccessfulPaymentToken } from "../Slices/cartSlice.js";

// Load the Razorpay SDK from the CDN
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

// Buy Food Order
export async function BuyFoodOrder(token, foodItems, user, navigate, dispatch) {
  // console.log("Token Abhay", token);
  const toastId = toast.loading("Processing your order...");
  try {
    // Load Razorpay SDK
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      toast.error("Razorpay SDK failed to load. Check your Internet connection.");
      return;
    }
console.log("script load ho gyi jee aage error hoga")
       const totalAmount = foodItems.reduce((total, item) => {
        return total + (item.foodItemPrice * item.quantity);
      }, 0); 

      console.log("total amount hai jee",totalAmount);

    // Initiating the payment request to backend
    const orderResponse = await apiConnector(
        "POST",
        "http://localhost:4000/api/v1/payment/capturePayment",
        { foodItems , totalAmount, token },  
        { Authorization: `Bearer ${token}` }
      );
       console.log("order response aaya hai jeee",orderResponse)
       console.log("Token:", token);
        console.log("Payload:", { foodItems, totalAmount });
        console.log("Headers:", { Authorization: `Bearer ${token}` });


    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }

    // Check user details
    if (!user ||  !user.email) {
      toast.error("User details are missing. Please log in again.");
      return;
    }

    // Prepare Razorpay payment options
    const options = {
      key: "rzp_test_0mz7eui4rVN842",
      currency: orderResponse.data.data.currency,
      amount: `${orderResponse.data.data.amount}`,
      order_id: orderResponse.data.data.id,
      name: "BiteTasty",
      description: "Thank you for your order!",
      image: rzpLogo,  // logo change krlo for BiteTasty 
      prefill: {
        name: "guest-user",
        email: user.email || "guest@example.com",
      },
      handler: function (response) {
        sendOrderSuccessEmail(response, orderResponse.data.data.amount, token, dispatch, navigate);
        verifyOrderPayment({ ...response, foodItems,totalAmount }, token, navigate, dispatch);
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops! Payment Failed.");
      console.log(response.error);
    });
  } catch (error) {
    console.log("ORDER PAYMENT ERROR: ", error);
    toast.error("Could not process the payment.");
  }
  toast.dismiss(toastId);
}

// Verify the Order Payment
async function verifyOrderPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying payment...");

  try {

    console.log("body data",bodyData);
    const response = await apiConnector(
      "POST",
      "http://localhost:4000/api/v1/payment/verifyPayment",
      {bodyData, token},
      { Authorization:`Bearer ${token}`}
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    const successfulPaymentToken = response.data.successfulPaymentToken;
    dispatch(setSuccessfulPaymentToken(successfulPaymentToken));

    toast.success("Payment Successful! Your order is being processed.");
  } catch (error) {
    console.log("ORDER PAYMENT VERIFICATION ERROR: ", error);
    toast.error("Could not verify the payment.");
  }
  toast.dismiss(toastId);
}

// Send Order Success Email
async function sendOrderSuccessEmail(response, amount, token, dispatch, navigate) {
  try {
    await apiConnector(
      "POST",
      "http://localhost:4000/api/v1/payment/sendPaymentSuccessEmail",
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
        token
      },
      { Authorization: `Bearer ${token}` }
    );
    toast.success("Order successful email send to your email");
    dispatch(setSuccessfulPaymentToken(null));
    navigate("/order");
  } catch (error) {
    console.log("ORDER SUCCESS EMAIL ERROR: ", error);
  }
}