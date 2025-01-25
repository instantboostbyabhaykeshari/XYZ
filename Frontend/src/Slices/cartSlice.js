import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    foodItemAddedToCart: (() => {
      try {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        return [];
      }
    })(),
    counter: 0,
    successfulPaymentToken: null
  };  

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addFoodItemToCart(state, action) {
        const item = action.payload;
      
        if (!Array.isArray(state.foodItemAddedToCart)) {
          state.foodItemAddedToCart = [];
        }
      
        const existingItem = state.foodItemAddedToCart.find(
          (cartItem) => cartItem.foodItemName === item.foodItemName
        );
      
        if (existingItem) {
          // If item already exists, update its quantity
          existingItem.quantity += item.quantity;
        } else {
          // Otherwise, add new item
          state.foodItemAddedToCart.push({ ...item, quantity: item.quantity || 1 });
        }
      
        // Sync with localStorage
        localStorage.setItem("cart", JSON.stringify(state.foodItemAddedToCart));
        state.counter += 1;
      },
      
    removeFoodItemFromCart(state, action) {
      const foodItemName = action.payload;
      state.foodItemAddedToCart = state.foodItemAddedToCart.filter(
        (item) => item.foodItemName !== foodItemName
      );

      // Sync with localStorage
      localStorage.setItem("cart", JSON.stringify(state.foodItemAddedToCart));
      state.counter -= 1;
    },
    updateFoodItemQuantity(state, action) {
      const { foodItemName, quantity } = action.payload;
      const existingItem = state.foodItemAddedToCart.find(
        (item) => item.foodItemName === foodItemName
      );

      if (existingItem) {
        existingItem.quantity = quantity;

        // Sync with localStorage
        localStorage.setItem("cart", JSON.stringify(state.foodItemAddedToCart));
      }
    },
    setSuccessfulPaymentToken(state, action) {
      state.successfulPaymentToken = action.payload;
      if (action.payload === null) {
        state.foodItemAddedToCart = [];
        state.counter = 0;
    
        // Sync with localStorage
        localStorage.setItem("cart", JSON.stringify(state.foodItemAddedToCart));
      }
    }
  },
});

export const {
  addFoodItemToCart,
  removeFoodItemFromCart,
  updateFoodItemQuantity,
  setSuccessfulPaymentToken
} = cartSlice.actions;
export default cartSlice.reducer;
