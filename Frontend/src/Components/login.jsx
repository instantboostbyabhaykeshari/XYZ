import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import "../Styles/login.css";
import { useState } from 'react';
import apiConnector from "../Services/apiConnector.js";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setSignUpData } from '../Slices/authSlice.js';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInput = (event) => {
        event.target.value = event.target.value.replace(/[^0-9]/, "");
        //Limit to 10 digit
        if(event.target.value.length>10){
            event.target.value = event.target.value.slice(0, 10);
        }
    }

    let [formData, setFormData] = useState({
        email: "",
        mobileNo: ""
    });

    const handleFormData = (event) => {
        let fieldName = event.target.name;
        let newValue = event.target.value;

        setFormData((currentData) => {
            return {...currentData, [fieldName]:newValue}
        });
    }

    const handleSubmit = (event) => {
        try{
            event.preventDefault();
            setFormData({
                email: "",
                mobileNo: ""
            });
        }catch(err){
            console.log(err);
        }
    }

    const signUpData = {...formData};
    console.log(signUpData);

    const {email} = formData;
    const sendOtp = async() => {
        if(formData.mobileNo === ""){
            toast.error("Enter mobile number.");
        }else {
            try{
                const response = await apiConnector("POST", "http://localhost:4000/api/v1/sendOtp", {email});
                console.log(response);
                //Set signUpData state 
                dispatch(setSignUpData(signUpData));
                localStorage.setItem("signUpdata", JSON.stringify(signUpData));
                navigate("/verification");
            }catch(err){
                console.log(err);
            }
        }
    }

    return (
        <div>
            <div className="loginImage"></div>
            <h1 className="hungryQuote">Hungry? Login fast to eat delicious food</h1>
            <form onSubmit={handleSubmit}>
                <div className="form">
                    <TextField
                        required
                        id="email"
                        variant="outlined"
                        label="Enter your email"
                        value={formData.email}
                        name="email"
                        onChange={handleFormData}
                    />
                    <TextField
                        required
                        id="mobileNo"
                        variant="outlined"
                        label="Enter Mobile number"
                        value={formData.mobileNo}
                        name="mobileNo"
                        onInput={handleInput}
                        onChange={handleFormData}
                    />
                    <Button variant="contained" type="submit" onClick={sendOtp} >Send otp on email</Button>
                </div>
            </form>
        </div>
    )
}

export default Login;