import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import all_positions from '../../../../api/json data/positions'
import months from '../../../../api/json data/months'
import sports from '../../../../api/json data/sports';
import userApi from '../../../../api/axiosconfig'
import { useSelector } from 'react-redux';

const ExperienceModal = ({isOpen, closeUpdateModal,getUserAcademies,initialState}) => {
  const [positions,setPositions] = useState([])
  const [academies,setAcademies] = useState([])
  const [filteredAcademies,setFilteredAcademies] = useState([])
  const [id,setId] = useState(initialState?.id ? initialState?.id : null)
  const [errors,setErrors] = useState({})
  console.log(initialState);
  const [formData,setFormData] = useState({
    'sport': !initialState?.sport ? '' : sports.includes(initialState?.sport) ? initialState?.sport :'other',
    'position': initialState?.position ? initialState.position : '',
    'academy': initialState?.academy_details?.id ? initialState?.academy_details?.id : '',
    'start_month': initialState?.start_month ? initialState?.start_month: '',
    'start_year': initialState?.start_year ? initialState?.start_year :'',
    'end_month': initialState?.end_month ? initialState?.end_month : '',
    'end_year': initialState?.end_year ? initialState?.end_year : '',
    'academy_name':  initialState?.academy_details?.username ?  initialState?.academy_details?.username : '',
    'is_current': initialState?.is_current ? initialState?.is_current : false,
    'customSport': sports.includes(initialState?.sport) ? '':initialState?.sport
  })
  const dob = useSelector(state=>state.auth.dob)
  useEffect(()=>{
    getAcademies()
  },[])

  //  to get all academy names from server
  const getAcademies = async ()=>{
    try{
      const response = await userApi.get('list_academy')
      console.log(response);
      if (response.data && response.data.status===200){
        setAcademies(response.data.academy)
      }
      else if (response.data && response.data.status===204){
        setAcademies([])
      }
    }catch(err){
      console.log(err);
    }
  }

  // to get all positons from selected sport
  const handleSport = (e)=>{
    handleChange(e)
    const value = (e.target.value).toLowerCase()
    console.log(value);
    if (value==='football' || value ==='cricket'){  
      const currPositons = all_positions.find((obj)=>(obj.name===value))
      console.log(currPositons.positions);
      setPositions(currPositons.positions)
    }else{
        setPositions([])
    }
  }

  //  to handle changes in teh input field
  const handleChange = (e)=>{
    console.log(e.target,'eo');
    const name = e.target.name
    let value = e.target.type === 'checkbox'? e.target.checked : e.target.value;
    setFormData({...formData,[name]:value})
  }
  console.log(formData,id);

  //  to set id and name of the academy after selecting
  const handleAcademySelection = (academyName)=>{
      setFormData(prevState =>({
        ...prevState,academy:academyName.id,academy_name:academyName.username
      }))
      setFilteredAcademies([])
  }
  //  to handle changes as typing in academy field
  const handleAcademyChange = (e)=>{
      const value = e.target.value.toLowerCase();
      setFormData((prevState) => ({
        ...prevState,
        academy_name: value,
      }));

      const filtered = academies.filter((academy) =>
        academy.username.toLowerCase().includes(value)
      );
      setFilteredAcademies(filtered);
      console.log(filtered,'filtered');
      if (value === ''){
        setFilteredAcademies([])
      }
  }
  // to validate formData 
  const validateForm = ()=>{
    let formErrors = {}
    if (!formData.sport) formErrors.sport = "Sport is Required"
    if (!formData.position) formErrors.position = "Postition is Required"
    if (!formData.academy) formErrors.academy_name = "Select valid academy"
    if (!formData.start_month) formErrors.start_month = "Start Month is Required"
    if (!formData.start_year) formErrors.start_year = "Start year is required"
    if (!formData.is_current && !formData.end_month) formErrors.end_month = "End month is required if not currently playing"
    if (!formData.is_current && !formData.end_year) formErrors.end_year = "End year is required if not currently playing"
    setErrors(formErrors)
    return Object.keys(formErrors).length === 0
  }
  // to handle form submission
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if (!validateForm()) return
    const submissionData = { ...formData };
    if (submissionData.sport === 'other') {
      submissionData.sport = submissionData.customSport;
    }
    console.log(submissionData);
    delete submissionData.customSport;
    try{
      let res
      if (id){
        res = await userApi.put(`user_academy/${id}`,submissionData)
      }else{
        res = await userApi.post(`user_academy`,formData)
      }
      if (res.status===200){
        showToastMessage({status:200,message:'updated succesfully'})
      }else if(res.status===201){
        showToastMessage({status:200,message:"Created successfully"})
      }
      console.log(res,'after submititing');
      
    }catch(error){
      console.log(error,'error in submiting');
    }
    getUserAcademies()
    closeUpdateModal()
  }

  const deleteUserAcademy = async ()=>{
    try{
      const res = await userApi.delete(`user_academy/${id}`)
      console.log(res, 'delete response');
      if (res.status===204){
        showToastMessage({status:200,message:'deleted successfully'})
      } 
    }catch(error){
      console.log(error,'delete error');
    }
    getUserAcademies() 
    closeUpdateModal()
  }

  const showToastMessage = ({ status, message }) => {
    console.log(status, message);
    const options = {
        position: 'bottom-right',
        draggable: true,
    }
    if (status===200){
        toast.success(message, options);
        console.log('success');
    }
    else{
        toast.error(message,options)
        console.log('toast error');
    }
    };

  const birthYear = dob? new Date(dob).getFullYear(): 1990 
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear-birthYear-2 }, (_, i) => new Date().getFullYear() - i);
  // console.log(formData,birthYear);
  return (
    <ReactModal
        isOpen={isOpen}
        onRequestClose={closeUpdateModal}
        ariaHideApp={false}
        style={{
          content: {
            position: 'relative',
            margin: 'auto',
            maxWidth: '900px',
            width: '90%',
            inset: 'auto',
            //  borderRadius: '8px',
            overflow: 'auto',
            padding: '20px',
            border: 'none',
            // top: '50%',
            // transform: 'translateY(-50%)',
            backgroundColor: '#fff',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow:'auto'
          },
        }}
      >
          <div className="items-center mb-5 w-full font-kanit">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:text-lg" title='close'
              onClick={closeUpdateModal}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg text-center capitalize">Add Played Academy </h3>
            <form className='px-3 text-center' onSubmit={handleSubmit}>
              <div className='flex flex-col items-start mb-4 '>
                <label htmlFor="sport" className=''>Sport:</label>
                <select value={formData.sport} name="sport" id="sport" className='w-full border-2 pl-2 py-1 text-slate-400' onChange={handleSport}>
                  <option value="" disabled >select a sport</option>
                  {
                      sports.map((pos,index)=>(
                      <option key={index} value={pos}>{pos}</option>
                      ))
                    }
                </select>
                {errors.sport && <div className="text-red-500 text-sm">{errors.sport}</div>}
              </div>
              {(formData?.sport === 'other' || 
                  (!sports.includes(formData.sport))) && (
              <div className="flex flex-col items-start mb-4">
                <label className="text-md " htmlFor="customSport">Specify Sport</label>
                <input type="text" name="customSport" placeholder="Enter sport name" value={formData.customSport} onChange={handleChange} className='w-full border-2 pl-2 py-1 text-slate-400' />
                {/* {errors.customSport && <p className='text-red-500 text-sm'>{error.customSport}</p>} */}
              </div>
            )}
              <div className='flex flex-col items-start mb-4'>
                <label htmlFor="position" className='mb-2'>Position / Style:</label>
                {
                   positions.length > 0  ?
                  <>
                      <select value={formData.position} name="position" id="position" className='w-full border-2 pl-2 py-1 text-slate-400' onChange={handleChange}>
                        <option value="" disabled >select a position</option>
                        {
                          positions.map((pos,index)=>(
                            <option key={index} value={pos}>{pos}</option>
                          ))
                        }
                      </select>
                    </>
                    : <>
                        <input type="text" placeholder='enter position  or playing style' value={formData.position} name='position'  className='w-full border-2 pl-2 py-1 text-slate-400' onChange={handleChange} />
                      </>
                }
                {errors.position && <div className="text-red-500 text-sm">{errors.position}</div>}
                </div>
              <div className='flex flex-col items-start mb-4'>
                <label htmlFor="name" className='mb-2'>Name:</label>
                <input  name='academy_name' id='name' type="text" placeholder='name of academy' value={formData.academy_name} className='w-full border-2 pl-2 py-1' onChange={handleAcademyChange}/>
                {filteredAcademies.length > 0 && (
                  <ul className="border-2 w-full mt-2 text-start">
                    {filteredAcademies.map((academy, index) => (
                      <li key={index} className='p-2 cursor-pointer hover:bg-gray-200' onClick={() => handleAcademySelection(academy)}>
                        <img src="" alt="" /> {academy.username} 
                      </li>
                    ))}
                  </ul>
                )}
                {errors.academy_name && <div className="text-red-500 text-sm">{errors.academy_name}</div>}
              </div>
              <div className='flex flex-col items-start mb-4'>
                <label htmlFor="startMonth" className='mb-2'>Start Date:</label>
                <div className='w-full text-start flex'>
                  <div  className='w-1/2 '>
                    <select value={formData.start_month} name="start_month" id="start_month" className='w-full border-2 pl-2 py-1 text-slate-400 capitalize' onChange={handleChange}>
                      <option value="" disabled >select month</option>
                      {
                        months.map((obj,index)=>(
                          <option key={index} value={obj}>{obj}</option>
                        ))
                      }
                    </select>
                      {errors.start_month && <div className="text-red-500 text-sm">{errors.start_month}</div>} 
                  </div>
                  <div className='w-1/2'>
                    <select value={formData.start_year} name="start_year" id="start_year" className='w-full border-2 pl-2 py-1 text-slate-400 capitalize' onChange={handleChange}>
                      <option value="" disabled >select year</option>
                      {
                        years.map((obj,index)=>(
                          <option key={index} value={obj}>{obj}</option>
                        ))
                      }
                    </select>
                    {errors.start_year && <div className="text-red-500 text-sm">{errors.start_year}</div>}
                  </div>

                </div>
              </div>
              <div className='flex flex-col items-start mb-4'>
                <label htmlFor="endMonth" className='mb-2'>End Date:</label>
                <div className='w-full text-start flex'>
                  <div className='w-1/2'>
                    <select value={formData.is_current?'':formData.end_month} name="end_month" id="end_month" className='w-full border-2 pl-2 py-1 text-slate-500 capitalize' onChange={handleChange} disabled={formData.is_current}>
                      <option value="" disabled>select month</option>
                      {
                        months.map((obj,index)=>(
                          <option key={index} value={obj}>{obj}</option>
                        ))
                      }
                    </select>
                      {errors.end_month && <div className="text-red-500 text-sm">{errors.end_month}</div>}
                    </div>
                  <div className='w-1/2'>
                      <select value={formData.is_current?'':formData.end_year} name="end_year" id="end_year" className='w-full border-2 pl-2 py-1 text-slate-500 capitalize' onChange={handleChange} disabled={formData.is_current}>
                        <option value="" disabled>select year</option>
                        {
                          years.map((obj,index)=>(
                            <option key={index} value={obj}>{obj}</option>
                          ))
                        }
                      </select>
                      {errors.end_year && <div className="text-red-500 text-sm">{errors.end_year}</div>}
                    </div>
                </div>
              </div>
              <div className='flex flex-col items-start mb-4'>
                <div className='flex items-center'>
                  <label>Currently Playing:</label>
                  <input type="checkbox" placeholder='' checked={formData.is_current} name='is_current' className='border-2 size-4 ml-2'  onChange={handleChange}/>
                </div>
              </div>

              <div className=''>
                {id && <span className='border-2 px-4 py-1 rounded-full border-red-500 mr-5 text-red-500 cursor-pointer hover:text-red-900 hover:border-red-900' onClick={deleteUserAcademy}> Delete </span>}
                <button className='bg-blue-500 border-2 border-blue-500 rounded-2xl py-1 px-5 text-white mt-4 hover:bg-blue-600'>Save</button>
              </div>
            </form>
          </div>
      </ReactModal>
  )
}

export default ExperienceModal
