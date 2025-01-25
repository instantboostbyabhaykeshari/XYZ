import React from 'react';
import { FaRegBookmark } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";
import "../../Styles/Components/core/Food-Card.css";

function FoodCard({amount, foodItemName, foodItemThumbnail, foodItemDescription, addToCart}) {
    const price = amount;
  return (
    <div className='foodCard'>
      <img className="cardImage" src={foodItemThumbnail} alt="pizza-image" />
      <FaRegBookmark className='foodCardBookmark'/>
      <div className="foodItemNameRating">
        <p>{foodItemName}</p>
        <div className="foodItemRating">
            <p>4.2</p>
            <IoMdStar />
        </div>
      </div>
      <div className="foodCardDescription">
        <p>{foodItemDescription}</p>
      </div>
      <h2>{price.toLocaleString("en-IN", {style: "currency", currency: "INR"})}</h2>
      <div className="addToCart">
        <div className='bestSeller'>BestSeller</div>
        <div className="cardButton" onClick={addToCart}>
            <p>Add to cart</p>
            <IoMdAddCircleOutline className='addToCartPlusSymbol'/>
        </div>
      </div>
    </div>
  )
}

export default FoodCard;
