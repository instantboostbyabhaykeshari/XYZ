const express = require("express");
const router = express.Router();
const {
  createCategory,
  showAllCategories,
  categoryPageDetails,
} = require("../Controllers/Category");

router.post("/create", createCategory);


router.get("/showAllCategories", showAllCategories);


router.post("/details", categoryPageDetails);

module.exports = router;
