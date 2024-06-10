import React,{useState} from 'react'
import Button from '../common/Button';
import InputField from '../common/InputField';
import trainingImg from '../../assets/coaching2.webp'
import all_states from '../../api/states_districts'
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from '../common/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { signup, toggleOtpAcess } from '../../redux/slices/authSlice';
import Swal from 'sweetalert2';

const Academy_signup = () => {
    const sports = ['Football', 'Cricket']

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
    const [error,setError] = useState({})

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {message, loading} = useSelector(state=>state.auth)

    // to get all states as a list and pass it down as options
    const states = [...all_states.map((obj)=>(
       obj.state 
    ))]
    // to get all dsitricts from the selected state 
    const handledistrict = (e)=>{
      const state = e.target.value
      const dist =  all_states.find((obj) => obj.state === state)?.districts || []
      setDistrict(dist)
      handleChange(e)
    }

    const handleChange = (e)=>{
      const name = e.target.name
      const value = e.target.value
    if(name === 'license'){
        setFormData({...formData,[name]:e.target.files[0]})
      }else{
        setFormData({...formData,[name]:value})
      }
    }
    // to validate signup data 
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
      }else if (new Date(today)< new Date(formData.dob)){
          errors.dob = `Invalid Date`
      } 
      
      if (!formData.state) errors.state = "State is required"
      if (!formData.district) errors.district = "District is required"
      if (!formData.sport) errors.sport = "Sport is required"
      // if (!formData.password){
      //     errors.password = "Password is required "
      // }else if(!passwordRegex.test(formData.password)){
      //     errors.password = "Password must contain \n at least one symbol, one number, one uppercase letter, one lowercase letter, and a minimum length of 6 characters "
      // }
      console.log(formData.license);
      if (!formData.license){
        errors.license = "Need to add license for verification"
      }
      setError(errors)
      console.log(errors,'error in validate');
      return Object.keys(errors).length ===0
  }


    //  to handle the form submission it will call the async function in userslice
    const handleSubmit = async (e)=>{
      e.preventDefault();
      if (!validate()) return
      console.log(formData,'in submit');
      try{
        const res = await dispatch(signup(formData)).unwrap()
        console.log(res.data,'academy signup response',message);
        await Swal.fire({
          icon: 'success',
          title: 'Registration successfull',
          text: "Chec email for verification"
        })
        dispatch(toggleOtpAcess(true))
        navigate('/otp_verification',{state:{email:formData.email,is_academy:true}})
      }catch(err){
        Swal.fire({
          icon:'error',
          title:'Oops...',
          text: err.message || "something went wrong",
        })
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
            {error.username && <p className='text-red-500 text-center text-sm'> {error.username} </p>}
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
            {error.email && <p className='text-red-500 text-center font-light'> {error.email} </p>}
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
            {error.dob && <p className='text-red-500 text-center text-sm'> {error.dob} </p>}
            </div>
            <div className="my-1 font-light text-slate-500 ">
            <Dropdown options={states} label='state' onChange={handledistrict} ></Dropdown>      
            {error.state && <p className='text-red-500 text-center text-sm'> {error.state} </p>}
            </div>   
            {district && 
              <div className="my-1 font-light text-slate-500 ">
              <Dropdown options={district} label='district' onChange={handleChange}></Dropdown>    
              {error.district && <p className='text-red-500 text-center text-sm'> {error.district} </p>}
              </div> 
             }  
            <div className="my-1 font-light text-slate-500 ">
              <Dropdown options={sports} label='sport' onChange={handleChange} ></Dropdown>      
              {error.sport && <p className='text-red-500 text-center text-sm'> {error.sport} </p>}
            </div> 
            <div className="mt-1">
              <label className="block text-md font-extralight" htmlFor="password">
                Password
              </label>
              <InputField name='password' type='password' placeholder='password' onChange={handleChange} />
              {error.password && <p className='text-red-500 text-center text-xs'> {error.password} </p>}
              </div>
            <div className='w-80 my-1 font-light text-slate-500'>
              <label className="text-md font-extralight text-black" htmlFor="password">
                License verification 
              </label>
              <InputField type="file" name='license' onChange={handleChange}/>
              {error.license && <p className='text-red-500 text-center text-sm'> {error.license} </p>}
            </div>
            <div className="">
              <Button name='Signup' role='academy' />
            </div>
          </form>
          <p className="font-light text-center">
            Already have an account?{" "}
           <Link to={'/academy/login'}> 
              <span className="cursor-pointer text-sm text-cyan-400 hover:underline">
                Login
              </span>
            </Link> 
          </p>
          <Link to={'/signup'}> <p className='text-center mt-3 text-cyan-400 hover:underline cursor-pointer  lg:hidden'> Join us as a player</p> </Link> 
        </div>
      </div>
      </div>
    </div>
    )
}

export default Academy_signup
