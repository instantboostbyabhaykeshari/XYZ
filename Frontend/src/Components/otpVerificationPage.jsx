import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import "../Styles/otpVerificationPage.css";
import { Link, useNavigate } from 'react-router-dom';
import apiConnector from '../Services/apiConnector';
import { useDispatch, useSelector } from 'react-redux';
import "../Styles/Pages/otpVerificationPage.css";
import { signUp } from '../Services/Operations/authAPI';

function OtpVerificationPage() {
    let [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {signUpData, loading} = useSelector((state) => state.auth);
    console.log(signUpData);

    const handleVerifyAndSignUp = (event) => {
      event.preventDefault();
      const {email, mobileNo} = signUpData;
      dispatch(signUp(email, mobileNo, otp, navigate));
    }

    otp = Number(otp);

    // console.log(typeof otp);

  return (
    <div className="verify">
        {
          loading ? (<div style={{width: "100vw", height: "100vh"}}><div className="spinner"></div></div>) : (
          <div>
            <div className='otpVerificationPageDetails'>
              <p className='verificationCodePara'>Verification Code</p>
              <p className='weHaveSentVerificationCode'>We have sent the verification code to your email address <span className='userEmailAtVerificationTime'>{signUpData.email}</span></p>
            </div>
            <form className='otpVerificationForm' onSubmit={handleVerifyAndSignUp}>
              <OtpInput
              containerStyle={{justifyContent: 'space-between'}}
                value={otp}
                onChange={setOtp}
                numInputs={6}
                inputType='tel'
                renderInput={(props) => (
                  <input {...props} placeholder='-' className='verifyOtpInput'/>
                )}
              />
              <button className='verifyEmailButton' type="submit">Verify</button>
            </form>
          </div>)
        }
    </div>
  )
}

export default OtpVerificationPage;
