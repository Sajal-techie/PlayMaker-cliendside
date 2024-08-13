import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import months from '../../../../api/json data/months'
import userApi from '../../../../api/axiosconfig'
import { useSelector } from 'react-redux';
import { baseUrl } from '../../../../api/api';

const AchievementModal = ({isOpen,closeAchievementModal,getAchievements,initialState}) => {
    const [id,setId] = useState(initialState?.id ? initialState?.id : null)
    const [image,setImage] = useState(initialState?.image ? initialState?.image : '')
    const [errors,setErrors] = useState({})
    const [formData,setFormData] = useState({
        'title': initialState?.title ? initialState?.title : '',
        'image': '',
        'description': initialState?.description ? initialState?.description : 'dd',
        'issued_by': initialState?.issued_by ? initialState?.issued_by : '',
        'issued_month': initialState?.issued_month ? initialState?.issued_month : '',
        'issued_year': initialState?.issued_year ? initialState?.issued_year : '',
    })
    const {dob, role} = useSelector(state=>state.auth)

    useEffect (()=>{
            if (initialState?.image){
                fetchImageAsBlob(initialState.image)
            }
    },[])
    
    //  to convert image url to blob 
    const fetchImageAsBlob = async (url)=>{
        try{
            let name = image
            if (name.includes(`${baseUrl}media/images/`)){
                console.log(' iam insdie');
                name = name.replace(`${baseUrl}media/images/`,'')
                console.log(name,'aname');
            }
            const res = await fetch(url)
            const blob = await res.blob()
            const file = new File ([blob], name,{type:blob.type})
            console.log(file,'sdfasdfasdf',blob);
            setFormData({...formData,image:file})
        }catch(error){
                console.log(error,'error making blob');
        }
    }
    //  to handle changes in input elements 
    const handleChange = (e)=>{
        const value = e.target.value
        const name = e.target.name

        if (name === 'image'){
            setFormData({...formData,[name]:e.target.files[0]})
        }else{
            setFormData({...formData,[name]:value})
        }
    }
    const validateForm = ()=>{
      let formErrors = {}
      if (!formData.title) formErrors.title = "Title is Required"
      if (!formData.issued_by) formErrors.issued_by = "Organization is Required"
      if (!formData.issued_month) formErrors.issued_month = "Issued month is Required"
      if (!formData.issued_year) formErrors.issued_year = "Issued year is Required"
      const allowedTypes = ['image/jpeg','image/png','image/webp']
      if (formData.image && !allowedTypes.includes(formData.image.type) && !id ){
        formErrors.image = "Invalid file type select JPEG , PNG or webp image"
      }
      setErrors(formErrors)
      return Object.keys(formErrors).length === 0
    }
    //  to submit form data
    const handleSubmit = async (e)=>{
      console.log('submit');
        e.preventDefault()
        if (!validateForm()) return
        const formd = new FormData()
        if (formData.image){ 
          formd.append('image',formData.image)
        }
        formd.append('title',formData.title)
        formd.append('issued_by',formData.issued_by)
        formd.append('issued_month',formData.issued_month)
        formd.append('issued_year',formData.issued_year)
        formd.append('description',formData.description)
        try{
            let res
            if (id){
                res = await userApi.put('user_achievement/'+id,formd)
            }else{
                res = await userApi.post('user_achievement',formd)
            }
            console.log(res, 'submit response achievement');
            if (res.status === 200){
                showToastMessage({status:res.status,message:"Updated successfully"})
            }else if(res.status===201){
                showToastMessage({status:200,message:'created successfully'})
            }
        }catch(error){
            console.log(error,'achievement submit error');
            if (error.status ===403){
              showToastMessage({status:error.status,message:error.data.detail})
            }else{
              showToastMessage({status:400,message:"Server error try again later"})
            }
        }
        setFormData(null)
        getAchievements()
        closeAchievementModal()
    }
    //  to delete achievement 
    const deleteAchievement = async ()=>{
        try{
            const res = await userApi.delete('user_achievement/'+id)
            console.log(res, 'delete success');
            if (res.status === 204){
                showToastMessage({status:200,message:"Deleted successfully"})
            }
        }catch(error){
            console.log(error,'error in deleting academy');
            if (error.status==403){
              showToastMessage({status:403,message:error.data?.detail})
            }else{
              showToastMessage({status:400,message:"Server error try again later"})
            }
        }
        getAchievements()
        closeAchievementModal()
    }
    console.log(formData,'achievement form data',id,image);
    
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
    const years = Array.from({ length: role==='academy' ? currentYear-birthYear : currentYear-birthYear-2 }, (_, i) => new Date().getFullYear() - i);
  return (
    <ReactModal
        isOpen={isOpen}
        onRequestClose={closeAchievementModal}
        ariaHideApp={false}
        style={{
          content: {
            position: 'relative',
            margin: 'auto',
            marginTop:'80px',
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
              onClick={closeAchievementModal}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg text-center capitalize">Add Achievement </h3>
            <form className='px-3 text-center' onSubmit={handleSubmit} encType="multipart/form-data">
              <div className='flex flex-col items-start mb-4'>
                <label htmlFor="title" className='mb-2'>Title:</label>
                <input  name='title' id='title' type="text" placeholder='title' value={formData.title} className='w-full border-2 pl-2 py-1' onChange={handleChange}/>
                {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
              </div>
              <div className='flex flex-col items-start mb-4'>
                <label htmlFor="issued_by" className='mb-2'>Issuing Organization:</label>
                <input  name='issued_by' id='issued_by' type="text" placeholder='issuing organization' value={formData.issued_by} className='w-full border-2 pl-2 py-1' onChange={handleChange}/>
                {errors.issued_by && <div className="text-red-500 text-sm">{errors.issued_by}</div>}
              </div>
              <div className='flex flex-col items-start mb-4'>
                <label htmlFor="startMonth" className='mb-2'>Issued Date:</label>
                <div className='w-full text-start flex'>
                  <div  className='w-1/2 '>
                    <select value={formData.issued_month} name="issued_month" id="issued_month" className='w-full border-2 pl-2 py-1 text-slate-400 capitalize' onChange={handleChange}>
                      <option value="" disabled >select month</option>
                      {
                        months.map((obj,index)=>(
                          <option key={index} value={obj}>{obj}</option>
                        ))
                      }
                    </select>
                      {errors.issued_month && <div className="text-red-500 text-sm">{errors.issued_month}</div>} 
                  </div>
                  <div className='w-1/2'>
                    <select value={formData.issued_year} name="issued_year" id="issued_year" className='w-full border-2 pl-2 py-1 text-slate-400 capitalize' onChange={handleChange}>
                      <option value="" disabled >select year</option>
                      {
                        years.map((obj,index)=>(
                          <option key={index} value={obj}>{obj}</option>
                        ))
                      }
                    </select>
                    {errors.issued_year && <div className="text-red-500 text-sm">{errors.issued_year}</div>}
                  </div>
                </div>
                    <div className='flex flex-col items-start'>
                        <label htmlFor="image" className='mb-2'>Issuing Organization:</label>
                        <input accept='image/*'  name='image' id='image' type="file"  className='w-full border-2 pl-2 py-1' onChange={handleChange}/>
                    </div>
                    {errors.image && <div className="text-red-500 text-sm">{errors.image}</div>}
              </div>
              <div className=''>
                {id && <span className='border-2 px-4 py-1 rounded-full border-red-500 mr-5 text-red-500 cursor-pointer hover:text-red-900 hover:border-red-900' onClick={deleteAchievement}> Delete </span>}
                <button className='bg-blue-500 border-2 border-blue-500 rounded-2xl py-1 px-5 text-white mt-4 hover:bg-blue-600'>Save</button>
              </div>
            </form>
          </div>
      </ReactModal>
  )
}

export default AchievementModal
