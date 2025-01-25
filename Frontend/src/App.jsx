import React from "react";
import { useEffect, useState } from "react";
import Profile from "./Components/profile";
import Splash from "./Components/splash";
import WebApp from "./Components/webApp";
import Login from "./Components/login";
import { Route, Routes, Navigate } from "react-router-dom";
import OtpVerificationPage from "./Components/otpVerificationPage";
import { useSelector } from "react-redux";
import FoodCard from "./Components/core/Food-Card";
import Cart from "./Components/Pages/Cart";
import AllFoodItems from "./Components/Pages/All-Food-Items";
import "./App.css";
import Order from "./Components/Pages/Order";

function App() {
  let [splashScreen, setSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplashScreen(false);
    }, 2000);
  }, []);

  const { token } = useSelector((state) => state.auth);
  // const token = null;
  // console.log(token);

  return (
    <div>
      {splashScreen ? (
        <Splash />
      ) : (
        <Routes>
          {token !== null ? (
            <Route path="/home" element={<WebApp />}></Route>
          ) : (
            <Route path="/login" element={<Login />}></Route>
          )}
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/verification" element={<OtpVerificationPage />}></Route>
          <Route path="/card" element={<FoodCard />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/order" element={<Order />}></Route>
          <Route path="/all-food-items" element={<AllFoodItems />}></Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
