import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import InputField from '../common/InputField';
import trainingImg from '../../assets/training2.png'
import all_states from '../../api/states_districts'
import Dropdown from '../common/Dropdown';
import { signup } from '../../redux/slices/authSlice';

const Signup = () => {
  const sports = ['Football', 'Cricket']

  const [formData, setFormData] = useState({
    username:'',
    email:'',
    dob:'',
    password:'',
    state:'',
    district:'',
    sport:'',
    is_academy: false
  })
  const [district,setDistrict] = useState('')

  const dispatch = useDispatch()
  const message = useSelector((state)=>state.auth.message)
  const navigate = useNavigate()

  //  useEffect (()=>{

  //  })
  // to handle changes in the form elements
  const handleChange = (e)=>{
    const name = e.target.name
    const value = e.target.value
      setFormData({...formData,[name]:value})
  }
  console.log(formData);
  // to get all states as a list and pass it down as options
  const states = [...all_states.map((obj)=>(
     obj.state 
  ))]
  // to get all dsitricts from the selected state 
  const handledistrict = (e)=>{
    handleChange(e)
    const state = e.target.value
    {[...all_states.map((obj)=>{
      if(obj.state === state){
        setDistrict(obj.districts)
      }
    })]}
  }
  //  to handle the form submission
  const handleSubmit = async (e)=>{
    e.preventDefault()
    console.log('in submit');
    try{
      const result = await dispatch(signup(formData)).unwrap()
      console.log(message,'===============================================',result);
      navigate('/otp_verification', {state : {email : formData.email}})
    } catch(error){
      console.log(error);
    }
  }
  return (
    <div className='flex flex-col md:flex-row justify-center items-center font-kanit '>
    <div className=' lg:w-1/2 hidden lg:block h-screen bg-cover bg-center' style={{ backgroundImage: `url(${trainingImg})`}} >
     <div className='h-4/6' >
     </div>
     <div className='text-center '>
      <Link to={'/academy/signup'}>   <span className='bg-white p-3 border border-gblue-300 rounded-full text-gblue-300 hover:cursor-pointer  hover:text-white hover:bg-gblue-600'> Join us as an academy </span> </Link>
     </div>
    </div>
    <div className='lg:w-1/2 flex justify-center items-center '>
    <div className='flex justify-center items-center ' >
      <div className=' p-10 border'>
        <form onSubmit={handleSubmit}>
          <div className='text-center'> 
            <span className="text-2xl  text-gblue-500 ">Welcome to Galacticos</span>
            <h1 className="text-3xl font-medium text-gblue-600">Signup</h1>
          </div>
          <div className="my-1">
            <label className="text-md font-extralight" htmlFor="name">
              Name
            </label>
            <InputField
              type="name"
              name="username"
              placeholder="name"
              onChange={handleChange}
            />
          </div>
          <div className="my-1">
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
          <div className="my-1 font-light text-slate-500 ">
            <label className="text-md font-extralight text-black" htmlFor="email">
              Date of birth
            </label>
            <InputField
              type="date"
              name="dob"
              placeholder="date"
              onChange={handleChange}
            />
          </div>
          <div className="my-1 font-light text-slate-500 ">
          <Dropdown options={states} label='state' onChange={handledistrict} ></Dropdown>      
          </div>   
          <div className="my-1 font-light text-slate-500 ">
          {district &&  <Dropdown options={district} label='district' onChange={handleChange} ></Dropdown> }     
          </div>  
          <div className="my-1 font-light text-slate-500 ">
          <Dropdown options={sports} label='sport'  onChange={handleChange} ></Dropdown>      
          </div> 
          <div className="mt-1">
            <label className="block text-md font-extralight" htmlFor="password">
              Password
            </label>
            <InputField name='password' type='password' placeholder='password'  onChange={handleChange} />
          </div>
          <div className="">
            <Button name='Signup' />
          </div>
        </form>
        <p className="font-light text-center">
          Already have an account?{" "}
         <Link to={'/'}> 
         <span className="cursor-pointer text-sm text-orange-400 hover:underline">
            Login
          </span>
          </Link> 
        </p>
        <Link to={'/academy/signup'}>  <p className='text-center mt-3 text-orange-400 hover:underline cursor-pointer  lg:hidden'> Join us as an academy</p> </Link> 
      </div>
    </div>
    </div>
  </div>
  )
}

export default Signup
