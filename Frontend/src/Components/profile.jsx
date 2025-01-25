import { FaUser } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { IoIosHelpCircle } from "react-icons/io";
import { BiSolidLogOut } from "react-icons/bi";
import Bottom from "./bottom";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../Components/core/ConfirmationModal.jsx";
import {logout} from "../Services/Operations/authAPI.js";
import { useState } from "react";
import "../Styles/profile.css";

const Profile = () => {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const {signUpData} = useSelector((state)=>state.auth);
    const [confirmationModal, setConfirmationModal] = useState(null);
    console.log(signUpData);

    return (
        <div className="profilePage">
            <div className="user">
                <img src="/images/profile.png" alt="" />
                <div className="userNameGmail">
                    <h3>{signUpData.email}</h3>
                    <p>{signUpData.mobileNo}</p>
                </div>
            </div>
            <div className="userList">
                <div className="userListIcon">
                    <div><FaUser/></div>
                    <div><FaReceipt/></div>
                    <div><IoLocation /></div>
                    <div><MdPayment/></div>
                    <div><IoIosMail/></div>
                    <div><IoMdSettings/></div>
                    <div><IoIosHelpCircle/></div>
                </div>
                <div className="userListName">
                    <div>My Profile</div>
                    <div>My Orders</div>
                    <div>Delivery Address</div>
                    <div>Payments Methods</div>
                    <div>Contact Us</div>
                    <div>Setting</div>
                    <div>Help & FAQ</div>
                </div>
            </div>

            <Link to="/home" style={{textDecoration: "none"}}>
                <div
                    className="logout"
                    onClick={(e) => {
                        e.preventDefault()
                    
                    setConfirmationModal({
                        text1: "Are you sure?",
                        text2: "You will be logged out of your account.",
                        btn1Text: "Logout",
                        btn2Text: "Cancel",
                        btn1Handler: () => {
                        dispatch(logout(navigate)); // Proceed with logout
                        setConfirmationModal(null); // Close modal after logout
                        },
                        btn2Handler: () => setConfirmationModal(null), // Cancel action
                    });
                    }}
                >
                    <BiSolidLogOut /> Log out
                </div>
            </Link>
            {confirmationModal && (
                <ConfirmationModal modalData={confirmationModal}></ConfirmationModal>
            )}

            <Bottom profileIconColor={"#4FAF5A"} />
        </div>
    )
}

export default Profile;