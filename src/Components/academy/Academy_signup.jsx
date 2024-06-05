import React,{useState} from 'react'
import Button from '../common/Button';
import InputField from '../common/InputField';
import trainingImg from '../../assets/coaching2.webp'
import all_states from '../../api/states_districts'
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from '../common/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/slices/authSlice';

const Academy_signup = () => {
    const [formData,setFormData] = useState({
      username:'',
      email:'',
      dob:'',
      password:'',
      state:'',
      district:'',
      sport:'',
      is_academy: true,
      license:null
    })
    const [district,setDistrict] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const message = useSelector(state=>state.auth.message)
    const states = [...all_states.map((obj)=>(
       obj.state 
    ))]
    const handledistrict = (e)=>{
      const state = e.target.value
      const dist =  all_states.find((obj) => obj.state === state)?.districts || []
      setDistrict(dist)
      handleChange(e)
    }
    const sports = ['Football', 'Cricket']

    const handleChange = (e)=>{
      const name = e.target.name
      const value = e.target.value
    if(name === 'license'){
        setFormData({...formData,[name]:e.target.files[0]})
      }else{
        setFormData({...formData,[name]:value})
      }
    }

    const handleSubmit = async (e)=>{
      e.preventDefault();
      console.log(formData,'in submit');
      try{
        const res = await dispatch(signup(formData)).unwrap()
        console.log(res.data,'academy signup response',message);
        navigate('/otp_verification',{state:{email:formData.email,is_academy:true}})
      }catch(err){
        console.log(err, 'sigmup form error acadm');
      }
      
    }
    return (
      <div className='flex flex-col md:flex-row justify-center items-center font-kanit overflow-ellipsis'>
      <div className='lg:w-1/2 hidden lg:block h-screen' style={{ backgroundImage: `url(${trainingImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
       <div className='h-4/6'>
       </div>
       <div className='text-center '>
        <Link to={'/signup'}>   <span className='bg-white p-3 border border-indigo-300 rounded-full text-indigo-600 hover:cursor-pointer hover:text-white hover:bg-indigo-600'> Join us as a player </span> </Link>
       </div>
      </div>
      <div className='lg:w-1/2 flex justify-center items-center'>
      <div className='flex justify-center items-center '>
        <div className=' py-1 px-10 border '>
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
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
                Established date
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
            {district && <Dropdown options={district} label='district' onChange={handleChange}></Dropdown> }     
            </div>  
            <div className="my-1 font-light text-slate-500 ">
              <Dropdown options={sports} label='sport' onChange={handleChange} ></Dropdown>      
            </div> 
            <div className="mt-1">
              <label className="block text-md font-extralight" htmlFor="password">
                Password
              </label>
              <InputField name='password' type='password' placeholder='password' onChange={handleChange} />
            </div>
            <div className='w-80 my-1 font-light text-slate-500'>
              <label className="text-md font-extralight text-black" htmlFor="password">
                License verification 
              </label>
              <InputField type="file" name='license' onChange={handleChange}/>
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
