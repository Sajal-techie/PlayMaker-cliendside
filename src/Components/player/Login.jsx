import React from 'react'
import Button from '../common/Button';
import InputField from '../common/InputField';
import trainingImg from '../../assets/training.jpg'
import { Link } from 'react-router-dom';
const Login = () => {
  return (
    <div className='flex flex-col md:flex-row justify-center items-center font-kanit '>
    <div className=' lg:w-1/2 hidden lg:block h-screen' style={{ backgroundImage: `url(${trainingImg})` ,backgroundSize: 'cover', backgroundPosition: 'center' }} >
     <div className='h-4/6' >
     </div>
     <div className='h-1/2 text-center '>
      <Link to={'/academy_login'}>   <span className='bg-white p-3 border border-gblue-300 rounded-full text-gblue-300 hover:cursor-pointer'> Join us as an academy </span> </Link>
     </div>
    </div>
    <div className='lg:w-1/2 flex justify-center items-center'>
    <div className='flex justify-center items-center h-screen'>
      <div className=' p-10 border '>
        <form>
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
            />
          </div>
          <div className="mt-5">
            <label className="block text-md mb-2 font-extralight" htmlFor="password">
              Password
            </label>
            <InputField name='password' type='password' placeholder='password' />
          </div>
          <div className="flex justify-between">
            <div>
              {/* Remember me option */}
            </div>
            <span className="text-sm text-orange-400 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>
          <div className="">
            <Button name='Login'  />
          </div>
        </form>
        <p className="font-light text-center">
          Don't have an account?{" "}
          <span className="cursor-pointer text-sm text-orange-400 hover:underline">
            Sign up
          </span>
        </p>
        <Link to={'/academy_login'}>  <p className='text-center mt-3 text-orange-400 hover:underline cursor-pointer  lg:hidden'> Join us as an academy</p> </Link> 
      </div>
    </div>
    </div>
  </div>
  );
}

export default Login
