const express = require("express");
const router = express.Router();
const {
  createFoodItem,
  editFoodItem,
  deleteFoodItem,
  getAllFoodItems,
  getFoodItemDetails
} = require("../Controllers/FoodItem");


router.post("/create", createFoodItem);
router.put("/edit", editFoodItem);
router.delete("/delete", deleteFoodItem);
router.get("/all", getAllFoodItems);
router.get("/details", getFoodItemDetails);

module.exports = router;
