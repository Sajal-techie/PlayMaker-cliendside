import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { LineWave } from 'react-loader-spinner';

import Button from '../../common/Button';
import InputField from '../../common/InputField';
import Dropdown from '../../common/Dropdown';
import all_states from '../../../api/json data/states_districts';
import sports from '../../../api/json data/sports';
import { signup, toggleOtpAcess } from '../../../redux/slices/authSlice';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dob: '',
    password: '',
    state: '',
    district: '',
    sport: '',
    customSport: '',
    is_academy: false
  });
  const [district, setDistrict] = useState([]);
  const [error, setError] = useState({});

  const message = useSelector((state) => state.auth.message);
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const states = all_states.map((obj) => obj.state);

  const handleDistrictChange = (e) => {
    handleChange(e);
    const state = e.target.value;
    const selectedState = all_states.find((obj) => obj.state === state);
    if (selectedState) {
      setDistrict(selectedState.districts);
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.state) errors.state = "State is required";
    if (!formData.district) errors.district = "District is required";
    if (!formData.sport) errors.sport = "Sport is required";
    if (formData.sport === 'other' && !formData.customSport.trim()) {
      errors.customSport = "Please specify the sport";
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    const submissionData = { ...formData };
    if (submissionData.sport === 'other') {
      submissionData.sport = submissionData.customSport;
    }
    delete submissionData.customSport;

    try {
      const result = await dispatch(signup(submissionData)).unwrap();
      await Swal.fire({
        icon: 'success',
        title: 'Registration successful',
        text: "Check your email for verification",
      });
      dispatch(toggleOtpAcess(true));
      navigate('/otp_verification', { state: { email: formData.email } });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        // title: 'Error',
        text: err?.message ? err.message : "Something went wrong",
      });
    }
  };

  const nextStep = (e) => {
    e.preventDefault()
    setError({})
    if (step === 1) {
      const errors = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*#?&])[A-Za-z\d@$%*&#?]{6,}$/;
      const today = new Date();
      const minAge = 7;
  
      if (!formData.username.trim()) errors.username = "Name is required";
      if (!formData.email) {
        errors.email = "Email is required";
      } else if (!emailRegex.test(formData.email)) {
        errors.email = "Email is Invalid";
      }
      if (!formData.dob) {
        errors.dob = "Date of birth is required";
      } else {
        const dob = new Date(formData.dob);
        if (today.getFullYear() - dob.getFullYear() < minAge) {
          errors.dob = `Minimum age required is ${minAge}`;
        }
      }
      if (!formData.password) {
        errors.password = "Password is required";
      } 
      // else if (!passwordRegex.test(formData.password)) {
      //   errors.password = "Password must contain at least one symbol,  one number, one uppercase letter, one lowercase letter, and a minimum length of 6 characters";
      // }
      setError(errors)
      if (Object.keys(errors).length > 0) return ; 
    }
    setStep(step + 1);
  };

  const prevStep = (e) =>{
    e.preventDefault()
    setStep(step - 1);
  } 
  console.log(formData);
  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <form>
            <div className="my-1 font-light">
              <label className="text-md font-extralight" htmlFor="username">Name</label>
              <br />
              <InputField type="text" name="username" placeholder="Name" value={formData.username} onChange={handleChange} />
              {error.username && <p className='text-red-500 text-sm'>{error.username}</p>}
            </div>
            <div className="my-1 font-light">
              <label className="text-md font-extralight" htmlFor="email">Email</label>
              <br />
              <InputField type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              {error.email && <p className='text-red-500 text-sm'>{error.email}</p>}
            </div>
            <div className="my-1 font-light text-slate-500">
              <label className="text-md font-extralight text-black" htmlFor="dob">Date of birth</label>
              <br />
              <InputField type="date" name="dob" value={formData.dob} onChange={handleChange} />
              {error.dob && <p className='text-red-500 text-sm'>{error.dob}</p>}
            </div>
            <div className="mt-1 font-light ">
              <label className="block text-md font-extralight" htmlFor="password">Password</label>
              <InputField name='password' type='password' placeholder='Password' value={formData.password} onChange={handleChange} />
              {error.password && <p className='text-red-500 text-xs text-wrap w-80'>{error.password}</p>}
            </div>
            {error.formIncomplete && <p className='text-red-500 text-sm'>{error.formIncomplete}</p>}
            <button onClick={nextStep} className='mt-4 mb-3 w-full text-gblue-500 py-2 rounded-md transition duration-100 border border-gblue-500 hover:bg-gray-200' >Next</button>
          </form>
        );
      case 2:
        return (
          <form onSubmit={handleSubmit}>
            <div className="my-1 font-light text-slate-500">
              <Dropdown options={states} label='state' value={formData.state} onChange={handleDistrictChange} />
              {error.state && <p className='text-red-500 text-sm'>{error.state}</p>}
            </div>
            {district.length > 0 && (
              <div className="my-1 font-light text-slate-500">
                <Dropdown options={district} label='district' value={formData.district} onChange={handleChange} />
                {error.district && <p className='text-red-500 text-sm'>{error.district}</p>}
              </div>
            )}
            <div className="my-1 font-light text-slate-500">
              <Dropdown options={sports} label='sport' value={formData.sport} onChange={handleChange} />
              {error.sport && <p className='text-red-500 text-sm'>{error.sport}</p>}
            </div>
            {formData.sport === 'other' && (
              <div className="my-1 font-light">
                <label className="text-md font-extralight" htmlFor="customSport">Specify Sport</label>
                <br />
                <InputField type="text" name="customSport" placeholder="Enter sport name" value={formData.customSport} onChange={handleChange} />
                {error.customSport && <p className='text-red-500 text-sm'>{error.customSport}</p>}
              </div>
            )}
            {/* <Button name='Back' onClick={prevStep} /> */}
            <button onClick={prevStep} className='mt-4 mb-3 w-full text-gblue-500 py-2 rounded-md transition duration-100 border border-gblue-500 hover:bg-gray-200'>
              Back
            </button>
            <Button name='Signup' type="submit" />
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className='bg-white flex flex-col md:flex-row justify-center items-center font-kanit'>
      <div className='lg:w-1/2 hidden lg:flex justify-center items-center h-screen'>
        <div className='w-3/4 h-3/4 bg-gradient-to-r from-indigo-500 to-purple-500 flex flex-col justify-center items-center rounded-lg'>
          <div className='text-center text-white p-5'>
            <h2 className='text-2xl font-bold'>Join PlayMaker Academy</h2>
            <p className='mt-4'>Empowering athletes to achieve greatness. Join us and elevate your academy to the next level!</p>
            <Link to={'/academy/signup'} className='mt-4 text-lg text-white underline hover:text-gray-200'>
              Sign up as Academy
            </Link>
          </div>
        </div>
      </div>
      <div className='lg:w-1/2 flex justify-center items-center'>
        <div className='flex justify-center items-center'>
          <div className='p-10 border bg-gray-100'>
            <div className='text-center'>
              <span className="text-2xl text-gblue-500">Welcome to PlayMaker</span>
              <h1 className="text-3xl font-medium text-gblue-600">Signup</h1>
            </div>
            {loading ? (
              <div className='flex justify-center -mt-12'>
                <LineWave color='#00BFFF' height={120} width={120} />
              </div>
            ) : (
              renderForm()
            )}
            <p className="font-light text-center">
              Already have an account?{" "}
              <Link to={'/'}>
                <span className="cursor-pointer text-sm text-orange-400 hover:underline">
                  Login
                </span>
              </Link>
            </p>
            <Link to={'/academy/signup'}>
              <p className='text-center mt-3 text-orange-400 hover:underline cursor-pointer lg:hidden'>
                Join us as an academy
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;