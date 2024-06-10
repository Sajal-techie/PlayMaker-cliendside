import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import {LineWave} from 'react-loader-spinner'
// import withReactContent from 'sweetalert2-react-content';

import Button from '../common/Button';
import InputField from '../common/InputField';
import trainingImg from '../../assets/training2.png'
import all_states from '../../api/states_districts'
import Dropdown from '../common/Dropdown';
import { signup, toggleOtpAcess } from '../../redux/slices/authSlice';

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
  const [error,setError] = useState({})

  const message = useSelector((state)=>state.auth.message)
  const loading = useSelector(state=>state.auth.loading)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e)=>{
    const name = e.target.name
    const value = e.target.value
      setFormData({...formData,[name]:value})
  }

  // to get all states as a list and pass it down as options
  const states = [...all_states.map((obj)=>(
     obj.state 
  ))]
  
  // to get all dsitricts from the selected state 
  const handledistrict = (e)=>{
    handleChange(e)
    const state = e.target.value
    const selectedState = all_states.find((obj) => obj.state === state);
    if (selectedState) {
      setDistrict(selectedState.districts);
    }
  }
  // to validate the signup data
  const validate = ()=>{
      const errors = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*#?&])[A-za-z\d@$%*&#?]{6,}$/
      const today = new Date()
      const minAge = 7
      if (!formData.username.trim()) errors.username = "Name is required"
      if (!formData.email){
        errors.email = "Email is required"
      }else if(!emailRegex.test(formData.email)){
          errors.email = "Email is Invalid"
      }
      if (!formData.dob){
        errors.dob = "Date of birth is required"
      }else {
        const dob = new Date(formData.dob)
        if (today.getFullYear() - dob.getFullYear() < minAge ){
          errors.dob = `Minimum age required is ${minAge}`
      } 
      }
      if (!formData.state) errors.state = "State is required"
      if (!formData.district) errors.district = "District is required"
      if (!formData.sport) errors.sport = "Sport is required"
      // if (!formData.password){
      //     errors.password = "Password is required "
      // }else if(!passwordRegex.test(formData.password)){
      //     errors.password = "Password must contain \n at least one symbol, one number, one uppercase letter, one lowercase letter, and a minimum length of 6 characters "
      // }
      setError(errors)
      console.log(errors,'error in validate');
      return Object.keys(errors).length ===0
  }

  //  to handle the form submission it will call the async function in userslice
  const handleSubmit = async (e)=>{
    e.preventDefault()
    if (!validate()) return
    console.log('in submit');
    try{
      const result = await dispatch(signup(formData)).unwrap()
      console.log(message,'===============================================',result);
      await Swal.fire({
        icon: 'success',
        title: 'Registration successfull',
        text: "Check your email for verification" ,
      })
      dispatch(toggleOtpAcess(true))
      navigate('/otp_verification', {state : {email : formData.email}})
    } catch(err){
      Swal.fire({
        icon:'error',
        title:'Oops...',
        text: err.message || "something went wrong",
      })
      console.log(err,'err in submit');
    }
  }
  return (
    <div className='bg-white flex flex-col md:flex-row justify-center items-center font-kanit '>
    <div className=' lg:w-1/2 hidden lg:block h-screen bg-cover bg-center' style={{ backgroundImage: `url(${trainingImg})`}} >
     <div className='h-4/6' >
     </div>
     <div className='text-center '>
      <Link to={'/academy/signup'}>   <span className='bg-white p-3 border border-gblue-300 rounded-full text-gblue-300 hover:cursor-pointer  hover:text-white hover:bg-gblue-600'> Join us as an academy </span> </Link>
     </div>
    </div>
    <div className='lg:w-1/2 flex justify-center items-center '>
    <div className='flex justify-center items-center ' >
      <div className=' p-10 border bg-gray-100'>
        <form onSubmit={handleSubmit}>
          <div className='text-center'> 
            <span className="text-2xl  text-gblue-500 ">Welcome to Galacticos</span>
            <h1 className="text-3xl font-medium text-gblue-600">Signup</h1>
          </div>
          <div className="my-1  font-light">
            <label className="text-md font-extralight" htmlFor="name">
              Name
            </label>
            <InputField
              type="name"
              name="username"
              placeholder="name"
              onChange={handleChange}
            />
            {error.username && <p className='text-red-500 text-center text-sm'> {error.username} </p>}
          </div>
          <div className="my-1  font-light">
            <label className="text-md font-extralight" htmlFor="email">
              Email
            </label>
            <InputField
              type="email"
              name="email"
              placeholder="email"
              onChange={handleChange}
            />
            {error.email && <p className='text-red-500 text-center'> {error.email} </p>}
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
            {error.dob && <p className='text-red-500 text-center text-sm'> {error.dob} </p>}
          </div>
          <div className="my-1 font-light text-slate-500 ">
          <Dropdown options={states} label='state' onChange={handledistrict} ></Dropdown> 
            {error.state && <p className='text-red-500 text-center text-sm'> {error.state} </p>}
          </div>   
          {district &&  
            <div className="my-1 font-light text-slate-500 ">
              <Dropdown options={district} label='district' onChange={handleChange} ></Dropdown>   
              {error.district && <p className='text-red-500 text-center text-sm'> {error.district} </p>}
            </div>  
          }
          <div className="my-1 font-light text-slate-500 ">
          <Dropdown options={sports} label='sport'  onChange={handleChange} ></Dropdown>      
          {error.sport && <p className='text-red-500 text-center text-sm'> {error.sport} </p>}
          </div> 
          <div className="mt-1 font-light ">
            <label className="block text-md font-extralight" htmlFor="password">
              Password
            </label>
            <InputField name='password' type='password' placeholder='password'  onChange={handleChange} />
            {error.password && <p className='text-red-500 text-center text-xs'> {error.password} </p>}
          </div>
          
           {loading ?
           <div className=' flex justify-center -mt-12'>
              <LineWave color='#00BFFF' height={120} width={120}  /> 
           </div>
             :
              <div>
                <Button name='Signup' />
              </div>
            }  
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
