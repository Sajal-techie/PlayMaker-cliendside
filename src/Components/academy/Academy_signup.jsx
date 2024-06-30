import React, { useState } from 'react'
import Button from '../common/Button';
import InputField from '../common/InputField';
import all_states from '../../api/json data/states_districts'
import sports from '../../api/json data/sports';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from '../common/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { signup, toggleOtpAcess } from '../../redux/slices/authSlice';
import Swal from 'sweetalert2';
import { LineWave } from 'react-loader-spinner';
import Select from 'react-select';

const Academy_signup = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        dob: '',
        password: '',
        state: '',
        district: '',
        sport: [],
        is_academy: true,
        license: '',
    })
    const [district, setDistrict] = useState([])
    const [error, setError] = useState({})
    const [selectedSports,setSelectedSports] = useState([])

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { message, loading } = useSelector(state => state.auth)

    const states = [...all_states.map((obj) => obj.state)]
    const sportOptions = sports.map(sport => ({ value: sport, label: sport }))

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === 'license') {
            setFormData({ ...formData, [name]: files[0] })
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }

    const handleDistrictChange = (e) => {
        const state = e.target.value
        const dist = all_states.find((obj) => obj.state === state)?.districts || []
        setDistrict(dist)
        handleChange(e)
    }

    const handleSportsChange = (selectedOptions) => {
      console.log(selectedOptions);
      if (selectedOptions.some(option=>option.value === 'other')){
        const customSport = prompt('please enter sport:')
        if (customSport){
          setSelectedSports(prev=>[...prev, { value: customSport, label: customSport }])
          setFormData({ ...formData, sport: selectedOptions.map(option => option.value !="other"? option.value : customSport) })
      }
      }else{

        setFormData({ ...formData, sport: selectedOptions.map(option => option.value) })
        setSelectedSports(selectedOptions)
      }
    }

    const validateStep1 = () => {
        const errors = {}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const today = new Date()

        if (!formData.username.trim()) errors.username = "Name is required"
        if (!formData.email) {
            errors.email = "Email is required"
        } else if (!emailRegex.test(formData.email)) {
            errors.email = "Email is Invalid"
        }
        if (!formData.dob) {
            errors.dob = "Established date is required"
        } else if (new Date(today) < new Date(formData.dob)) {
            errors.dob = `Invalid Date`
        }
        if (!formData.password) {
            errors.password = "Password is required"
        }

        setError(errors)
        return Object.keys(errors).length === 0
    }

    const validateStep2 = () => {
        const errors = {}

        if (!formData.state) errors.state = "State is required"
        if (!formData.district) errors.district = "District is required"
        if (formData.sport.length === 0) errors.sports = "At least one sport is required"
        if (!formData.license) {
            errors.license = "Required license for verification"
        }

        setError(errors)
        return Object.keys(errors).length === 0
    }

    const handleNextStep = (e) => {
        e.preventDefault()
        if (validateStep1()) {
            setStep(2)
        }
    }

    const handlePrevStep = (e) => {
        e.preventDefault()
        setStep(1)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateStep2()) return
        
        try {
            const res = await dispatch(signup(formData)).unwrap()
            await Swal.fire({
                icon: 'success',
                title: 'Registration successful',
                text: "Check email for verification"
            })
            dispatch(toggleOtpAcess(true))
            navigate('/otp_verification', { state: { email: formData.email, is_academy: true } })
        } catch (err) {
          console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message || "Something went wrong",
            })
        }
    }
    console.log(formData,selectedSports);
    return (
        <div className="flex justify-center items-center font-kanit bg-slate-300 min-h-screen">
            <div className="w-full max-w-4xl p-5 border bg-white text-center md:text-left">
                <div className="text-center mb-2">
                    <span className="text-2xl text-indigo-500">Welcome to PlayMaker</span>
                    <h1 className="text-3xl font-medium text-indigo-600">Academy Signup</h1>
                </div>
                {step === 1 ? (
                    <form onSubmit={handleNextStep}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:ml-12">
                            <div >
                                <label className="text-md font-extralight" htmlFor="username">Name</label> <br />
                                <InputField type="text" name="username" placeholder="Name" onChange={handleChange} value={formData.username} />
                                {error.username && <p className="text-red-500 text-sm md:mr-14">{error.username}</p>}
                            </div>
                            <div>
                                <label className="text-md font-extralight" htmlFor="email">Email</label> <br />
                                <InputField type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
                                {error.email && <p className="text-red-500 text-sm md:mr-14">{error.email}</p>}
                            </div>
                            <div>
                                <label className="text-md font-extralight text-black" htmlFor="dob">Established date</label><br />
                                <InputField type="date" name="dob" placeholder="Date" onChange={handleChange} value={formData.dob} />
                                {error.dob && <p className="text-red-500 text-sm md:mr-14">{error.dob}</p>}
                            </div>
                            <div>
                                <label className="text-md font-extralight" htmlFor="password">Password</label><br />
                                <InputField name="password" type="password" placeholder="Password" onChange={handleChange} value={formData.password}/>
                                {error.password && <p className="text-red-500 text-xs md:mr-14">{error.password}</p>}
                            </div>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <button type="submit" className='bg-indigo-600 hover:bg-indigo-800 text-white px-14 py-3 rounded transition duration-100'>Next</button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:ml-12">
                            <div className=''>
                                <Dropdown options={states} label="state" onChange={handleDistrictChange} value={formData.state}/>
                                {error.state && <p className="text-red-500 text-sm md:mr-14">{error.state}</p>}
                            </div>
                            {district.length > 0 && (
                                <div>
                                    <Dropdown options={district} label="district" onChange={handleChange} value={formData.district} />
                                    {error.district && <p className="text-red-500 text-sm md:mr-14">{error.district}</p>}
                                </div>
                            )}
                            <div className='flex justify-center md:block'>
                              <div>
                                  <label className="text-md font-extralight text-black" htmlFor="sports">Sports</label>
                                  <Select
                                      isMulti
                                      name="sport"
                                      options={sportOptions}
                                      className="border border-slate-300 w-80 rounded-md text-sm outline-none  "
                                      classNamePrefix="select"
                                      onChange={handleSportsChange}
                                      value={selectedSports}
                                      />
                                  {error.sports && <p className="text-red-500 text-sm md:mr-14">{error.sports}</p>}
                              </div>
                            </div>
                            <div className="w-full">
                                <label className="text-md font-extralight text-black" htmlFor="license">License verification</label> <br />
                                <InputField type="file" name="license" onChange={handleChange} />
                                {error.license && <p className="text-red-500 text-sm md:mr-14">{error.license}</p>}
                            </div>
                        </div>
                        <div className="mt-4 flex justify-center space-x-4">
                            {loading ? (
                              <span className='-mt-14 ml-10'>
                              <LineWave color="rgb(79 70 229)" height={120} width={120}  />
                              </span>
                            ) : (
                              <>
                                <button type="button" onClick={handlePrevStep} className='bg-gray-400 hover:bg-gray-500 text-white px-14 py-3 rounded transition duration-100'>Back</button>
                                <button type="submit" className='bg-indigo-600 hover:bg-indigo-800 text-white px-14 py-3 rounded transition duration-100'>Signup</button>
                              </>
                            )}
                        </div>
                    </form>
                )}
                <p className="font-light text-center mt-3">
                    Already have an account?{" "}
                    <Link to="/academy/login">
                        <span className="cursor-pointer text-sm text-cyan-400 hover:underline">Login</span>
                    </Link>
                </p>
                <Link to="/signup">
                    <p className="text-center mt-1 text-cyan-400 hover:underline cursor-pointer">Join us as a player</p>
                </Link>
            </div>
        </div>
    )
}

export default Academy_signup