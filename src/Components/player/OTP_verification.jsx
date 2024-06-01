import React, { useEffect, useRef, useState } from 'react';
import Button from '../common/Button';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../api/api';

const OTP_verification = () => {
  const [otp,setOtp] = useState(new Array(6).fill(''))
  const [error,setError] = useState('')
  const inputRefs = useRef([]);
  const {message,loading,user} = useSelector((state)=>state.auth)
  const location = useLocation();
  const email = location.state.email
  const navigate = useNavigate()

  const handleChange = (e, index) => {
    const { value } = e.target;
    const newOTP = [...otp]

    if (value.length === 1 ) {
      newOTP[index] = value
      setOtp(newOTP)
      if ( index < 5){
        inputRefs.current[index + 1].focus();
      }
    }
    if (value.length === 0 && index > 0) {
      newOTP[index] = ''
      setOtp(newOTP)
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && e.target.value === '') {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
    } 
  };

  //  to not display entire email 
  const maskEmail = (email) => {
    const [username, domain] = email.split('@');
    const maskedUsername = `${username.slice(0, 3)}****${username.slice(-2)}`;
    return `${maskedUsername}@${domain}`;
  };
  const maskedEmail = maskEmail(email)

  
  const handleClick = async ()=>{
    const newOtp = otp.join('')
    console.log(newOtp);
    if(newOtp.length === 6){
      const response = await axios.put(`${baseUrl}otp_verification`,{email,otp:newOtp})
      console.log(response);
      if(response.status===200 && response.data.status === 200){
        console.log(response.data,'success');
        navigate('/',{state:{info: 'OTP verified, you can now login'}})
      }
      else{
        console.log(response.data,'failed');
        setError(response.data.message)
      }
      
    }
  }
  console.log(message,'message in otp page',user,loading,otp.join(''),error);
  return (
    <div className="h-screen bg-slate-400 py-24 px-3">
      <div className="container mx-auto">
        <div className="max-w-sm mx-auto ">
          <div className="w-full">
            <div className="bg-white h-64 py-3 rounded-md text-center">
              <h1 className="text-2xl font-bold">OTP Verification</h1>
              <div className="flex flex-col mt-4">
                <span>Enter the OTP you received at</span>
                <span className="font-bold">{maskedEmail}</span>
              </div>
              
              <div id="otp" className="flex flex-row justify-center text-center px-2 mt-5">
                {Array(6).fill().map((_, index) => (
                  <input
                    key={index}
                    ref={(element) => (inputRefs.current[index] = element)}
                    className="m-2 border-2 border-slate-400 h-10 w-10 text-center form-control rounded"
                    type="text"
                    maxLength="1"
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>
              
              <div className="flex justify-center text-center">
                <a className="flex items-center text-orange-400 hover:text-orange-700 cursor-pointer">
                  <span className="font-bold">Resend OTP</span>
                  <i className='bx bx-caret-right ml-1'></i>
                </a>
              </div>
              {error}
              <div className="">
                <Button name='Verify' onClick={handleClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP_verification;
