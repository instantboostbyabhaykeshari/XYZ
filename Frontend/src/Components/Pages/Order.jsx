import React, { useEffect, useState } from 'react';
import "../../Styles/Pages/Order.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrder } from '../../Services/Operations/OrderAPI';
import { setLoading } from '../../Slices/authSlice';
import Bottom from '../bottom';

function Order() {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(1);
  const [orderRecentData, setOrderRecentData] = useState([]);
  const [orderFoodData, setOrderFoodData] = useState([]);
  const { loading, signUpData } = useSelector((state) => state.auth);

  console.log("Order email: ", signUpData);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await dispatch(fetchAllOrder(signUpData.email));
        console.log("Order response: ", response); 
        setOrderRecentData(response?.data?.fetchRecentOrders || []);
        setOrderFoodData(response?.data?.foodOrder || []);
        dispatch(setLoading(false));
      } catch (err) {
        console.error("Error while fetching orders: ", err);
      }
    };

    fetchOrders();
  }, [dispatch, signUpData.email]);

  console.log("Order recent data: ", orderRecentData);
  console.log("Loading: ", loading);

  return (
    <div className="order-page">
      <div className="myOrder">
        <p>My Orders</p>
      </div>

      <div className="orderToggle">
        <div
          className={toggle === 1 ? "toggleActive" : "toggleInactive"}
          onClick={() => setToggle(1)}
        >
          Recent Orders
        </div>
        <div
          className={toggle === 2 ? "toggleActive" : "toggleInactive"}
          onClick={() => setToggle(2)}
        >
          Past Orders
        </div>
      </div>

      {loading ? (
        <div className="loadingDiv"><div className="loading"></div></div>
      ) : orderRecentData.length === 0 ? (
        <div className="no-orders">
          <p>No orders found!</p>
        </div>
      ) : (
        <div className="order-list">
          {toggle===1 && orderRecentData.map((order, index) => (
            <div key={index} className="order-card">
              <div className="orderStatusNumberDetails">
                <p className='ordernumber'>Order #{index + 1}</p>
                <p className='orderStatus'>Status: {order.isDelivered ? ("Delivered"): ("Ordered")}</p>
              </div>
              <div className="order-details">
                {order.items.map((item, i) => (
                  <div key={i} className="order-item">
                    <div className="item-name orderDetails">{item.foodItem}</div>
                    <div className="item-quantity orderDetails">{item.quantity}</div>
                    <div className="item-price orderDetails">{item.price.toLocaleString("en-IN", {style: "currency", currency: "INR"})}</div>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <p style={{fontSize: "16px", fontWeight: "500"}}>Total:</p> 
                <p>{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString("en-IN", {style: "currency", currency: "INR"})}</p>
              </div>
              <div className="line"></div>
            </div>
          ))}

          {
            toggle === 2 && (<div className='toggle2'>No past order found !</div>)
          }

          
        </div>
      )}
      <Bottom/>
    </div>
  );
}

export default Order;
