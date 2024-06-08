import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Button from '../common/Button';
import InputField from '../common/InputField';
import trainingImg from '../../assets/training.jpg'
import { login } from '../../redux/slices/authSlice';

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
  const info = location?.state?.info
  console.log(info);

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(formData);
    try{
      const response = await dispatch(login(formData)).unwrap()
      console.log(response);
      
      navigate('/home')
    }catch(error){
      if (error.status === 403){
        navigate('/otp_verification', {state : {email : formData.email}})
        }
      console.log(error,'error');
      setError(error.message)
    }
  }
    console.log(error);
  return (
    <div className='flex flex-col md:flex-row justify-center items-center font-kanit '>
    <div className=' lg:w-1/2 hidden lg:block h-screen' style={{ backgroundImage: `url(${trainingImg})` ,backgroundSize: 'cover', backgroundPosition: 'center' }} >
     <div className='h-4/6' >
     </div>
     <div className='text-center '>
      <Link to={'/academy/login'}> <span className='bg-white p-3 border border-gblue-300 rounded-full text-gblue-300 hover:cursor-pointer  hover:text-white hover:bg-gblue-600 '> Join us as an academy </span> </Link>
     </div>
    </div>
    <div className='lg:w-1/2 flex justify-center items-center'>
    <div className='flex justify-center items-center h-screen'>
      <div className=' p-10 border '>
        <form onSubmit={handleSubmit}>
          <div className='text-center'> 
            <span className="text-2xl  text-gblue-500 ">Welcome back to Galacticos</span>
            <h1 className="text-3xl font-medium text-gblue-600">Login</h1>
          </div>
          <div className="my-3">
            <label className="text-md font-extralight" htmlFor="email">
              Email
            </label>
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
          {error}
          <div className="">
            <Button name='Login'  />
          </div>
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
