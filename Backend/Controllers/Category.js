const Category = require("../Models/Category");


exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const categoryDetails = await Category.create({
      name,
      description,
    });

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: categoryDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.showAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find();
    res.status(200).json({
      success: true,
      allCategories: allCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryName } = req.body;
    // console.log("CATEGORY Name: ", categoryName);

    //Validation
    if(!categoryName){
      return res.status(400).json({
        success: false,
        message: "Category name is missing."
      });
    }

    const selectedCategory = await Category.find({name: categoryName})
      .populate({
        path: "foodItems",
        match: { status: "Published" },
        // populate: "ratingAndReviews",
      })
      .exec();

      // console.log("Selected Category: ", selectedCategory);

    if (!selectedCategory) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    // if (!selectedCategory.foodItems || !Array.isArray(selectedCategory.foodItems)) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "No food items found for the selected category.",
    //   });
    // }

    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error in category page details.",
      error: error.message,
    });
  }
};
