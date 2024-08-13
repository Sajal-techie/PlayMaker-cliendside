import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { LineWave } from 'react-loader-spinner';
import sports from '../../../api/json data/sports';
import all_states from '../../../api/json data/states_districts';
import InputField from '../../common/InputField';
import Dropdown from '../../common/Dropdown';
import userApi from '../../../api/axiosconfig';
import { useNavigate } from 'react-router-dom';

const GetUserDetails = () => {
    const [districts,setDistricts] = useState([])
    const [error,setError] = useState({})
    const [loading,setLoading] = useState(false)
    const [formData, setFormData] = useState({
        dob: '',
        state: '',
        district: '',
        sport: '',
        customSport:''
      });
      
      const navigate = useNavigate()
      
      const today = new Date();
      const maxDate = new Date(today);
      maxDate.setFullYear(maxDate.getFullYear() - 7);
      const maxDateString = `${maxDate.getFullYear()}-${String(maxDate.getMonth() + 1).padStart(2, '0')}-${String(maxDate.getDate()).padStart(2, '0')}`;

      const states = all_states.map(state=>state.state)
      
      const handleDistrict = (e)=>{
        handleChange(e)
        const state = e.target.value
        const selectedState = all_states.find(obj=>obj.state==state)
        console.log(selectedState)
        if (selectedState.districts){
            setDistricts(selectedState.districts)
        }
      }
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
         ...prevData,
          [name]: value
        }));
      };
    
      const validate = () => {
        const errors = {};
        const today = new Date();
        const minAge = 7;
        if (!formData.dob) {
            errors.dob = "Date of birth is required";
          } else {
            const dob = new Date(formData.dob);
            if (today.getFullYear() - dob.getFullYear() < minAge) {
              errors.dob = `Minimum age required is ${minAge}`;
            }
          }
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
        if (!validate()) return
        setLoading(true)
        console.log(formData,states);
        const submissionData = { ...formData };
        if (submissionData.sport === 'other') {
          submissionData.sport = [submissionData.customSport];
        }else{
          submissionData.sport = [submissionData.sport]
        }
        delete submissionData.customSport;
        console.log(submissionData);
        try{
            const res = await userApi.post('profile',submissionData)
            console.log(res,'get detials response ');
            setLoading(false)
            await Swal.fire({
                icon: 'success',
                title: 'Updated successful',
                text: "User Information updated succesfully , \n Welcome to xSports",
              });
            navigate('/home')
        }catch(error){
            console.log(error);
            setLoading(false)
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error?.code==='ERR_NETWORK'?"Internal Server Error":"Bad Gateway",
              });
        }

    
      };
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center font-kanit">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Information</h2>
        <div className="my-2 font-light text-slate-500 ">
          <label className="block text-start ml-8" htmlFor="dob">Date of Birth</label>
          <InputField
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            max={maxDateString}
          />
              {error.dob && <p className='text-red-500 text-sm text-start ml-8'>{error.dob}</p>}
        </div>
        <div className="my-2 font-light text-slate-500 text-start ml-8">
              <Dropdown options={states} label='state' value={formData.state} onChange={handleDistrict} />
              {error.state && <p className='text-red-500 text-sm text-start '>{error.state}</p>}
        </div>
        {districts.length > 0 && (
              <div className="my-2 font-light text-slate-500 text-start ml-8">
                <Dropdown options={districts} label='district' value={formData.district} onChange={handleChange} />
                {error.district && <p className='text-red-500 text-sm text-start'>{error.district}</p>}
              </div>
            )}
            <div className="my-2 font-light text-slate-500 text-start ml-8">
              <Dropdown options={sports} label='sport' value={formData.sport} onChange={handleChange} />
              {error.sport && <p className='text-red-500 text-sm text-start'>{error.sport}</p>}
            </div>
            {formData.sport === 'other' && (
              <div className="my-2 font-light">
                <label className="text-md font-extralight block text-start ml-8" htmlFor="customSport">Specify Sport</label>
                <InputField type="text" name="customSport" placeholder="Enter sport name" value={formData.customSport} onChange={handleChange} />
                {error.customSport && <p className='text-red-500 text-sm text-start'>{error.customSport}</p>}
              </div>
            )}
        <div className="">
            {
                !loading ? 
                    <button className="bg-gblue-500 hover:bg-gblue-700 text-white py-3 px-10 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Submit
                    </button> 
                :
                    <div className='flex justify-center -mt-12 ml-8'>
                        <LineWave color='#00BFFF' height={120} width={120} />
                    </div>
            }   
        </div>
      </form>
    </div>
  )
}

export default GetUserDetails
