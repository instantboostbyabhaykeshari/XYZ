const FoodItem = require("../Models/FoodItem");
const Category = require("../Models/Category");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const dotenv = require("dotenv");
dotenv.config();

// Create a New Food Item
const createFoodItem = async (req, res) => {
  try {
    let { foodItemName, foodItemDescription, price, category, cookTime, status, discount } = req.body;
    const thumbnail = req.files?.thumbnailImage;

    if (!foodItemName || !price || !category || !cookTime || !status) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({ success: false, message: "Category not found!" });
    }

    let thumbnailImage = null;
    if (thumbnail) {
      const uploadedImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
      thumbnailImage = uploadedImage.secure_url;
    }

    const newFoodItem = await FoodItem.create({
      foodItemName,
      foodItemDescription,
      price,
      thumbnail: thumbnailImage,
      category: categoryDetails._id,
      cookTime,
      status: status || "Draft",
      discount: discount || 0,
    });

    await Category.findByIdAndUpdate(categoryDetails._id, { $push: { foodItems: newFoodItem._id } });

    res.status(200).json({ success: true, message: "Food item created successfully", data: newFoodItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to create food item", error: error.message });
  }
};

//edit
const editFoodItem = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    // Extract foodItemId safely from form-data or body
    const foodItemId = req.body.foodItemId || (req.files?.foodItemId && req.files.foodItemId[0]?.value);
    
    if (!foodItemId) {
      return res.status(400).json({ success: false, message: "Food item ID is required!" });
    }

    console.log("Searching for food item with ID:", foodItemId);

    const foodItem = await FoodItem.findById(foodItemId);
    if (!foodItem) {
      return res.status(404).json({ success: false, message: "Food item not found!" });
    }

    // Handle file upload if present
    if (req.files?.thumbnailImage) {
      const thumbnail = req.files.thumbnailImage;
      const uploadedImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
      console.log(uploadedImage);
      foodItem.thumbnail = uploadedImage.secure_url;
    }

    // Apply updates from form-data fields
    for (const key in req.body) {
      if (key !== "foodItemId" && req.body[key]) {
        foodItem[key] = req.body[key];
      }
    }

    await foodItem.save();
    res.status(200).json({ success: true, message: "Food item updated successfully", data: foodItem });

  } catch (error) {
    console.error("Error updating food item:", error);
    res.status(500).json({ success: false, message: "Failed to update food item", error: error.message });
  }
};


// Delete a Food Item
const deleteFoodItem = async (req, res) => {
  try {
    const { foodItemId } = req.body;

    const foodItem = await FoodItem.findById(foodItemId);
    if (!foodItem) {
      return res.status(404).json({ success: false, message: "Food item not found!" });
    }

    await Category.findByIdAndUpdate(foodItem.category, { $pull: { foodItems: foodItemId } });
    await FoodItem.findByIdAndDelete(foodItemId);

    res.status(200).json({ success: true, message: "Food item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete food item", error: error.message });
  }
};

// Get All Food Items
const getAllFoodItems = async (req, res) => {
  try {
    const {categoryId} = req.query;
    console.log("Category Id: ", categoryId);
    //Validation
    if(!categoryId){
      return res.status(401).json({
        success: false,
        message: "Invalid or missing categoryId."
      });
    }

    const foodItems = await FoodItem.find({ category: categoryId }).populate("category").exec();
    res.status(200).json({ success: true, foodItemData: foodItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch food items", error: error.message });
  }
};

// Get Details of a Single Food Item
const getFoodItemDetails = async (req, res) => {
  try {
    const { foodItemId } = req.body;

    const foodItemDetails = await FoodItem.findById(foodItemId)
      .populate("category") 
      // .populate("ratingAndReviews") 
      .exec();

    if (!foodItemDetails) {
      return res.status(404).json({ success: false, message: "Food item not found!" });
    }

    res.status(200).json({ success: true, data: foodItemDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch food item details", error: error.message });
  }
};

module.exports = {
  createFoodItem,
  editFoodItem,
  deleteFoodItem,
  getAllFoodItems,
  getFoodItemDetails,
};
