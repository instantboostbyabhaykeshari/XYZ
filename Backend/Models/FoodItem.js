const mongoose = require("mongoose")

const FoodItemSchema = new mongoose.Schema({
  foodItemName: { 
    type: String,
    required: true, 
    trim: true 
  },
  foodItemDescription: { 
    type: String, 
    trim: true 
  },
  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ],
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  thumbnail: {
    type: String,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  cookTime: {
    type: Number, 
    required: true, 
    min: 1, 
  },
  status: {
    type: String,
    enum: ["Draft", "Published"],
    default: "Draft",
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  }  
})

module.exports = mongoose.model("FoodItem", FoodItemSchema)