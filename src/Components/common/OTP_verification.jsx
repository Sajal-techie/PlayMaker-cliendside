import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import userApi from '../../api/axiosconfig';
import { toggleOtpAcess } from '../../redux/slices/authSlice';
import Swal from 'sweetalert2';
import { LineWave, RotatingLines } from 'react-loader-spinner';

const OTP_verification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60); // Timer state
  const inputRefs = useRef([]);
  const { is_access } = useSelector((state) => state.auth);
  const location = useLocation();
  const email = location?.state?.email;
  const is_academy = location.state?.is_academy;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!is_access) {
      navigate('/');
    }
  }, [is_access, navigate]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    const newOTP = [...otp];

    if (value.length === 1) {
      newOTP[index] = value;
      setOtp(newOTP);
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
    if (value.length === 0 && index > 0) {
      newOTP[index] = '';
      setOtp(newOTP);
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

  const maskEmail = (email) => {
    if (email) {
      const [username, domain] = email.split('@');
      const maskedUsername = `${username.slice(0, 3)}****${username.slice(-2)}`;
      return `${maskedUsername}@${domain}`;
    }
  };
  const maskedEmail = maskEmail(email);

  const handleClick = async () => {
    setLoading(true);
    setError('');
    const newOtp = otp.join('');
    if (newOtp.length < 6){ 
      setError('Enter 6 digits  OTP') 
      setLoading(false)
      return
    }
    if (newOtp.length === 6) {
      const response = await userApi.put(`otp_verification`, { email, otp: newOtp });
      if (response.status === 200 && response.data.status === 200) {
        dispatch(toggleOtpAcess(false));
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: "Verification Successful",
          text: "Now you can log in"
        });
        if (is_academy) {
          navigate('/academy/login', { state: { info: 'OTP verified, you can now login' } });
        } else {
          navigate('/', { state: { info: 'OTP verified, you can now login' } });
        }
      } else {
        setLoading(false);
        setError(response.data.message);
      }
    } else {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setTimer(60); // Reset timer
    try {
      const res = await userApi.post('resend_otp', { email: email });
      console.log(res);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  return is_access ? (
    <div className="h-screen py-24 px-3">
      <div className="container mx-auto">
        <div className="max-w-sm mx-auto">
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

              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex justify-center text-center text-orange-400">
                <span className="font-bold" disabled={timer > 0}>
                  {timer > 0 ? `Resend OTP in ${timer}s` : <span className=' hover:text-orange-700 cursor-pointer' onClick={resendOtp}>Resend OTP</span> }
                </span>
                <i className="bx bx-caret-right ml-1"></i>
              </div>

              {loading ? (
                <div className="flex justify-center -mt-12 ml-8">
                  <LineWave color="#00BFFF" width={120} height={120} />
                </div>
              ) : (
                <div className="font-kanit text-white">
                  <button
                    className="hover:bg-blue-600 mt-5 mb-3 w-full bg-blue-500 py-2 text-xl transition duration-100"
                    onClick={handleClick}
                  >
                    Verify
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center mt-28">
      <RotatingLines strokeColor="blue" />
    </div>
  );
};

export default OTP_verification;
