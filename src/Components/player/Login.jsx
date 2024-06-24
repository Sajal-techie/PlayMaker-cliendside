import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Button from '../common/Button';
import InputField from '../common/InputField';
import { login, toggleOtpAcess } from '../../redux/slices/authSlice';
import Swal from 'sweetalert2';
import { LineWave } from 'react-loader-spinner';

const Login = () => {
  const [formData, setFormData] = useState({
      email: '',
      password: '',
      is_academy:false
    })
  const [error,setError] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const loading = useSelector(state=>state.auth.loading)

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setError('')
    if (!formData.email ) {
      setError('Email is required')
      return
    }
    else if(!formData.password){
      setError('Password is required')
      return
    }
    console.log(formData);
    try{
      const response = await dispatch(login(formData)).unwrap()
      console.log(response);
      
      navigate('/home')
    }catch(error){
      if (error.status === 403){
        dispatch(toggleOtpAcess(true))
        await Swal.fire({
          icon : 'info',
          title: 'Verification Incomplete',
          text: "Check your email for verification"
        })
        navigate('/otp_verification', {state : {email : formData.email}})
        }
        else{
          await Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: error.message
        })
      }
      console.log(error,'error');
      // setError(error.message)
    }
  }
  return (
    <div className='bg-white flex flex-col md:flex-row justify-center items-center font-kanit '>
      <div className='lg:w-1/2 hidden lg:flex justify-center items-center h-screen'>
        <div className='w-3/4 h-3/4 bg-gradient-to-r from-indigo-500 to-purple-500 flex flex-col justify-center items-center rounded-lg'>
          <div className='text-center text-white p-5'>
            <h2 className='text-2xl font-bold'>Join PlayMaker Academy</h2>
            <p className='mt-4'>Empowering athletes to achieve greatness. Join us and elevate your academy to the next level!</p>
            <Link to={'/academy/login'} className='mt-4 text-lg text-white underline hover:text-gray-200'>
              Login as Academy
            </Link>
          </div>
        </div>
      </div>
    <div className='lg:w-1/2 flex justify-center items-center'>
    <div className='flex justify-center items-center h-screen'>
      <div className=' p-10 border bg-gray-100'>
        <form onSubmit={handleSubmit}>
          <div className='text-center'> 
            <span className="text-2xl  text-gblue-500 ">Welcome back to PlayMaker</span>
            <h1 className="text-3xl font-medium text-gblue-600">Login</h1>
          </div>
          <div className="my-3">
            <label className="text-md font-extralight" htmlFor="email">
              Email
            </label> <br />
            <InputField
              type="email"
              name="email"
              placeholder="email"
              onChange={handleChange}
            />
          </div>
          <div className="mt-5">
            <label className="block text-md mb-2 font-extralight" htmlFor="password">
              Password
            </label>
            <InputField name='password' type='password' placeholder='password' onChange={handleChange} />
          </div>
          <div className="flex justify-between">
            <div>

            </div>
            <span className="text-sm text-orange-400 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>
            <div className='text-red-500 '>
              {error}
            </div>
          {loading ?
            <div className='flex justify-center -mt-14'>
              <LineWave color='#00BFFF' height={120} width={120} /> 
            </div>
            :
            <div className="">
              <Button name='Login'  />
            </div>
           }
        </form>
        <p className="font-light text-center">
          Don't have an account?{" "}
          <Link to={'/signup'}> 
           <span className="cursor-pointer text-sm text-orange-400 hover:underline">
            Sign up
          </span>
          </Link>
        </p>
        <Link to={'/academy/login'}>  <p className='text-center mt-3 text-orange-400 hover:underline cursor-pointer  lg:hidden'> Join us as an academy</p> </Link> 
      </div>
    </div>
    </div>
  </div>
  );
}

export default Login
