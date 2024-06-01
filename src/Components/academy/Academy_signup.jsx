import React,{useState} from 'react'
import Button from '../common/Button';
import InputField from '../common/InputField';
import trainingImg from '../../assets/coaching2.webp'
import all_states from '../../api/states_districts'
import { Link } from 'react-router-dom';
import Dropdown from '../common/Dropdown';

const Academy_signup = () => {
    const [district,setDistrict] = useState('')
    const states = [...all_states.map((obj)=>(
       obj.state 
    ))]
    const handledistrict = (e)=>{
      const state = e.target.value
      {[...all_states.map((obj)=>{
        if(obj.state === state){
          setDistrict(obj.districts)
        }
      })]}
    }
    const sports = ['Football', 'Cricket']
    // console.log(district)
    // console.log(states);
    return (
      <div className='flex flex-col md:flex-row justify-center items-center font-kanit overflow-ellipsis'>
      <div className=' lg:w-1/2 hidden lg:block h-screen' style={{ backgroundImage: `url(${trainingImg})` ,backgroundSize: 'cover', backgroundPosition: 'center' }} >
       <div className='h-4/6' >
       </div>
       <div className='text-center '>
        <Link to={'/signup'}>   <span className='bg-white p-3 border border-indigo-300 rounded-full text-indigo-600 hover:cursor-pointer hover:text-white hover:bg-indigo-600'> Join us as a player </span> </Link>
       </div>
      </div>
      <div className='lg:w-1/2 flex justify-center items-center'>
      <div className='flex justify-center items-center '>
        <div className=' p-10 border '>
          <form>
            <div className='text-center'> 
              <span className="text-2xl  text-indigo-500 ">Welcome to Galacticos</span>
              <h1 className="text-3xl font-medium text-indigo-600">Academy Signup</h1>
            </div>
            <div className="my-1">
              <label className="text-md font-extralight" htmlFor="name">
                Name
              </label>
              <InputField
                type="name"
                name="name"
                placeholder="name"
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
              />
            </div>
            <div className="my-1 font-light text-slate-500 ">
              <label className="text-md font-extralight text-black" htmlFor="email">
                Established date
              </label>
              <InputField
                type="date"
                name="date"
                placeholder="date"
              />
            </div>
            <div className="my-1 font-light text-slate-500 ">
            <Dropdown options={states} label='State' onChange={handledistrict} ></Dropdown>      
            </div>   
            <div className="my-1 font-light text-slate-500 ">
            {district && <Dropdown options={district} label='District'></Dropdown> }     
            </div>  
            <div className="my-1 font-light text-slate-500 ">
              <Dropdown options={sports} label='Offered sport'  ></Dropdown>      
            </div> 
            <div className="mt-1">
              <label className="block text-md font-extralight" htmlFor="password">
                Password
              </label>
              <InputField name='password' type='password' placeholder='password' />
            </div>
            <div className='w-80 my-1 font-light text-slate-500'>
              <label className="text-md font-extralight text-black" htmlFor="password">
                License verification 
              </label>
              <InputField type="file" name='file'/>
            </div>
            <div className="">
              <Button name='Signup' role='academy'/>
            </div>
          </form>
          <p className="font-light text-center">
            Already have an account?{" "}
           <Link to={'/academy_login'}> 
              <span className="cursor-pointer text-sm text-cyan-400 hover:underline">
                Login
              </span>
            </Link> 
          </p>
          <Link to={'/signup'}>  <p className='text-center mt-3 text-cyan-400 hover:underline cursor-pointer  lg:hidden'> Join us as a player</p> </Link> 
        </div>
      </div>
      </div>
    </div>
    )
}

export default Academy_signup
