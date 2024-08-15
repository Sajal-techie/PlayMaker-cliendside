import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LineWave } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import userApi from '../../api/axiosconfig'; 
import { useDispatch } from 'react-redux';
import { toggleOtpAcess } from '../../redux/slices/authSlice';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    try {
      const response = await userApi.post('forget_pass', { email });
      console.log(response.data,response.status);
      if (response.status === 200) {
        await Swal.fire({
          icon: 'success',
          title: 'Reset Email Sent',
          text: 'Please check your email for Otp.',
        });
        dispatch(toggleOtpAcess(true))
        navigate('/otp_verification', {state : {email : email,forget_pass: true}})
      }
      // else if (response.status===200 && response.data.status===400){
      //   await Swal.fire({
      //       icon:'error',
      //       title:'Email not registered',
      //       text:'You are not registered try signing in'
      //   })
      //   navigate('/signup')
      // }
    } catch (error) {
        console.log(error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text:  error ==='"Internal Server Error" '? "Internal Server Error" :  error?.response?.data?.message || 'An error occurred. Please try again.',
        });
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 sm:p-6 lg:p-8 font-kanit">
      <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email to reset your password
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            {loading ? (
              <div className="flex justify-center">
                <LineWave color="#4F46E5" height={80} width={80} />
              </div>
            ) : (
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Verify email
              </button>
            )}
          </div>
        </form>
        <div className="text-center">
        <Link
            to={"/"}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;