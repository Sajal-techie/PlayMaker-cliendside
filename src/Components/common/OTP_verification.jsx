import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import userApi from '../../api/axiosconfig';
import { toggleOtpAcess } from '../../redux/slices/authSlice';
import Swal from 'sweetalert2';
import { LineWave, RotatingLines } from 'react-loader-spinner';

const OTP_verification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60); // Timer state

  const inputRefs = useRef([]);
  const { is_access } = useSelector((state) => state.auth);
  const location = useLocation();
  const email = location?.state?.email;
  const is_academy = location.state?.is_academy;
  const forget_pass = location.state?.forget_pass
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('in effect startt');
    if (!is_access || !email) {
      if (is_academy){
          console.log('is acd');
          navigate('/academy/login')
        }
        else{
          navigate('/');
        }
        console.log('is playe');
    }else{
      const countdown = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
      return () => clearInterval(countdown);
    }
    console.log('ineffect',is_access,email,forget_pass,is_academy);
  }, [is_access, email, is_academy, navigate]);


  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.value !== '' && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
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
    try{
      if (newOtp.length === 6) {
        const response = await userApi.put(`otp_verification`, { email, otp: newOtp });
        if (response.status === 200 ) {
          await Swal.fire({
            icon: 'success',
            title: "Verification Successful",
            text: forget_pass? ' Now create new password': "Now you can log in"
          });
          dispatch(toggleOtpAcess(false));
          if (forget_pass){
            console.log('in forget pass',email,is_academy);
            navigate('/reset_password', { state: { email: email, otpVerified: true,is_academy:is_academy } })
            console.log('below');
          }
          else if (is_academy) {
          console.log('in acdemy');
            navigate('/academy/login', { state: { info: 'OTP verified, you can now login::' } });
          } else {
          console.log('in player');
            navigate('/', { state: { info: 'OTP verified, you can now login:' } });
          }
          console.log('all out');
        } else {
          setError(response.data.message);
        }
      } else {
        setError('Server error try again after some time')
        }
    }catch(error){
        console.log(error);
        if (error==="Internal Server Error"){
          setError('Interal server Error, try again after some time')
        }else{
          setError(error.data.message);
        }
      }
      finally{
      setLoading(false)
    }
    console.log('goin otu of funstion');
  };
  console.log(forget_pass);
  
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
    <div className="p-8 bg-white rounded-xl shadow-2xl w-96">
      <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
        Verify Your Account
      </h2>
      <p className="mb-6 text-sm text-center text-gray-600">
        We've sent a 6-digit code to <b>{maskedEmail} </b>  Enter it below to confirm your account.
      </p>
      <form>
        <div className="flex justify-center mb-6 space-x-3">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              ref={(el) => (inputRefs.current[index] = el)}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-14 text-2xl font-bold text-center text-gray-800 bg-gray-100 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
          ))}
        </div>
        {error && <p className="text-red-500 text-xl font-bold text-center m-2">{error}</p>}
        {loading ? (
                <div className="flex justify-center -mt-12 ml-8">
                  <LineWave color="#00BFFF" width={120} height={120} />
                </div>
              ) :(
        <button
          type="button" onClick={handleClick}
          className="w-full px-4 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all text-lg font-semibold"
        >
          Verify
        </button>
        )}
      </form>
      <div className="mt-6 text-center" >
        {!timer > 0 ? (
          <button
            onClick={resendOtp}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Resend Code
          </button>
        ) : (
          <p className="text-gray-600">
            Resend code in <span className="font-semibold">{timer}s</span>
          </p>
        )}
      </div>
    </div>
  </div>) 
  :
  (
    <div className="flex justify-center mt-28">
      <RotatingLines strokeColor="blue" />
    </div>
  );
};

export default OTP_verification;
