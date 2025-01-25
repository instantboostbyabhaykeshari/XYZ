import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Slices/authSlice.js";
import cartSlice from "../Slices/cartSlice.js";

export const rootReducers = combineReducers({
    auth: authReducer,
    cart: cartSlice
});