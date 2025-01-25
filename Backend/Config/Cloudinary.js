// Import necessary modules
const cloudinary = require("cloudinary").v2;
require("dotenv").config(); // Load environment variables from .env file

// Export a function to configure and connect to Cloudinary
exports.cloudinaryConnect = () => {
  // Ensure all necessary environment variables are present
  const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    console.error("Missing Cloudinary configuration in environment variables.");
    return;
  }

  try {
    // Configure Cloudinary with environment variables
    cloudinary.config({
      cloud_name: CLOUD_NAME,
      api_key: API_KEY,
      api_secret: API_SECRET,
    });
    console.log("Cloudinary configuration successful.");
  } catch (error) {
    console.error("Failed to configure Cloudinary:", error.message);
  }
};
