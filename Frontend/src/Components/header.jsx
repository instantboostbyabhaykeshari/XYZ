import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faBell as faBellRegular } from "@fortawesome/free-regular-svg-icons";
import { FaShoppingCart } from "react-icons/fa";
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import "../Styles/header.css"
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    let [totalFoodOrders, setTotalFoodOrders] = useState(0);
    let {counter} = useSelector((state)=>state.cart);

    // setTotalFoodOrders(()=>{
    //     totalFoodOrders += counter;
    // });

    return (
        <div className="nav">
            <div className="navbar">
                <div className="location">
                    <div className="locationIcon"><FontAwesomeIcon className="faLocationDot" icon={faLocationDot}/></div>
                    <div className="locationName">
                        <p>Current Location <FontAwesomeIcon icon={faCaretDown}/></p>
                        <h4>Ramgarh, Sonebhadra</h4>
                    </div>
                </div>
                {/* <div className="bellIcon"><FontAwesomeIcon className="faBell" icon={faBellRegular}/></div> */}
                <Link to={"/cart"} >
                    <div className="cartIcon">
                        <FaShoppingCart className="faCart" />
                        <div className={counter>0 ? "totalFoodOrders" : "zeroFoodOrder"}><p className={counter>0?"greaterThanZeroFood": "zeroFood"}>{counter}</p></div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header;