import React, { useState } from 'react'
import InputField from '../common/InputField'
import Button from '../common/Button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/slices/authSlice'
import Swal from 'sweetalert2'
import { LineWave } from 'react-loader-spinner'

const Admin_login = () => {
  const [error,setError] = useState('')
  const [formData,setFormData] = useState({
    email:'',
    password:'',
    is_staff: true,
    is_academy: false,  
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector(state=>state.auth.loading)

  const handleChange = (e)=>{
    setFormData({
     ...formData,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit = async (e)=>{
    e.preventDefault()
    setError('')
    if (!formData.email){
      setError('Email is required')
      return
    }
    if (!formData.password){
      setError("Password is required")
      return
    }
    console.log(formData);
    try{
      const response =  await dispatch(login(formData)).unwrap()
      console.log(response);
      navigate('/admin/home')
    }catch(error){
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: error.message
      })
    }
  }
  return (
    <div className='flex flex-col md:flex-row justify-center items-center font-kanit '>
      <div className='lg:w-1/2 flex justify-center items-center'>
      <div className='flex justify-center items-center h-screen'>
        <div className=' p-10 border '>
          <form onSubmit={handleSubmit}>
            <div className='text-center'> 
              <span className="text-2xl  text-gblue-500 ">Welcome back to Galaticos</span>
              <h1 className="text-3xl font-medium text-gblue-600">Admin Login</h1>
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
              {/* <span className="text-sm text-orange-400 hover:underline cursor-pointer">
                Forgot password?
              </span> */}
            </div>
            <div className='text-red-500 text-center'>
              {error}
            </div>
            { loading ? 
                <div className='flex justify-center -mt-14'>
                  <LineWave color='#00BFFF' height={120} width={120} /> 
                </div>
                :
                <div className="">
                  <Button name='Login'  />
                </div>
              }
          </form>
          {/* <Link to={'/academy_login'}>  <p className='text-center mt-3 text-orange-400 hover:underline cursor-pointer  lg:hidden'> Join us as an academy</p> </Link>  */}
        </div>
      </div>
      </div>
    </div>
  )
}
export default Admin_login
