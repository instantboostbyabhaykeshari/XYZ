import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import apiConnector from "../../Services/apiConnector.js";
import FoodCard from "../core/Food-Card.jsx";
import { useNavigate } from "react-router-dom";
import Bottom from "../bottom.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addFoodItemToCart } from "../../Slices/cartSlice.js";
import Header from "../header.jsx";
import "../../Styles/Pages/All-Food-Items.css";

function AllFoodItems() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAllCategory, setShowAllCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Pizza");
  const [foodItems, setFoodItems] = useState();

  useEffect(() => {
    try{
      const showAllFoodCategories = async() => {
        const response = await apiConnector("GET", "http://localhost:4000/api/category/showAllCategories");
        console.log("Show all categories response: ", response);
        if(response?.data){
          setShowAllCategory(response?.data?.allCategories);
        }else{
          toast.error("Failed to fetch food categories");
        }
      }
      showAllFoodCategories();
    }catch(err){
      console.log(err);
      console.log("Error in fetching show all categories api.");
    }
  }, [activeCategory]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    navigate(`/all-food-items?category=${category}`)
  }

  useEffect(() => {
    try{
      const categoryPageDetails = async() => {
        const response = await apiConnector("POST", "http://localhost:4000/api/category/details", { categoryName: activeCategory })
        
        if(response?.data?.data){
          setFoodItems(response?.data?.data?.selectedCategory[0].foodItems);
          // console.log("Category page details response: ", response?.data?.data?.selectedCategory[0].foodItems);
        }
      }
      categoryPageDetails();
    }catch(err){
      console.log(err);
      console.log("Error in fetching category page details api.");
    }
  }, [activeCategory]);

  const addToCart = (foodItemName, foodItemPrice) => {
    const foodItem = {
      foodItemName,
      foodItemPrice,
      quantity: 1
    }
    dispatch(addFoodItemToCart(foodItem));
    toast.success("Items added successfully.");
  }
  
  return (
    <div>
      <Header/>
      <div className="foodListingDiv">
        <div className="foodListing">
          {
            showAllCategory.length > 0 ? (
              showAllCategory.map((item)=> (
                <div key={item.id} className={item.name ? "active": "nonActive"} onClick={()=>handleCategoryClick(item.name)}>{item.name}</div>
              ))
            ) : (<div>No any food category exist.</div>)
          }
        </div>
      </div>
      {
        foodItems ? (
          foodItems.map((foodItem)=>(
            <FoodCard amount={foodItem.price} foodItemName={foodItem.foodItemName} foodItemDescription={foodItem.foodItemDescription} foodItemThumbnail={foodItem.thumbnail} addToCart={()=>addToCart(foodItem.foodItemName, foodItem.price)} />
          ))
          ): (<div className="noFoodExistForThisCategory">No food items exist for this category.</div>)
      }
      <Bottom/>
    </div>
  );
}

export default AllFoodItems;
