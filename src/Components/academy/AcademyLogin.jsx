import React, { useState } from 'react'
import Button from '../common/Button';
import InputField from '../common/InputField';
import trainingImg from '../../assets/coaching.jpg'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
const AcademyLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    is_academy:true
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const info = location?.state?.info
  console.log(info,'info');
  const message = useSelector(state=>state.auth.message)
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(formData)
    console.log(message);
    try{
      const res = await  dispatch(login(formData)).unwrap()
      console.log(res,'res im academy login');
      navigate('/academy_home')
    }catch(err){
      console.log(err,'error in academy login');
    }
  }
  return (
    <div className='flex flex-col md:flex-row justify-center items-center font-kanit '>
    <div className=' lg:w-1/2 hidden lg:block h-screen' style={{ backgroundImage: `url(${trainingImg})` ,backgroundSize: 'cover', backgroundPosition: 'center' }} >
     <div className='h-3/5' >
     </div>
     <div className='text-center '>
     <Link to={'/'}>  <span className='bg-white p-3 border border-indigo-300 rounded-full text-indigo-500 hover:cursor-pointer  hover:text-white hover:bg-indigo-600'>  Join us as a player </span> </Link>
     </div>
    </div>
    <div className='lg:w-1/2 flex justify-center items-center'>
    <div className='flex justify-center items-center h-screen'>
      <div className=' p-10 border '>
        <form onSubmit={handleSubmit}>
          <div className='text-center'> 
            <span className="text-2xl  text-indigo-500 ">Welcome back to Galacticos</span>
            <h1 className="text-3xl font-medium text-indigo-600">Academy Login</h1>
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
            <span className="text-sm text-cyan-400 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>
          {message}
          <div className="">
            <Button name='Login' role='academy' />
          </div>
        </form>
        <p className="font-light text-center">
          Don't have an account?{" "}
          <Link to={'/academy_signup'}> 
          <span className="cursor-pointer text-sm text-cyan-400 hover:underline">
            Sign up
          </span>
          </Link>
        </p>
        <Link to={'/'}>  <p className='text-center mt-3 text-cyan-400 hover:underline cursor-pointer  lg:hidden'> Join us as a player</p> </Link>
      </div>
    </div>
    </div>
  </div>
  )
}

export default AcademyLogin
