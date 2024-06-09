import React, { useState } from 'react'
import userApi from '../../api/axiosconfig'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slices/authSlice'
import Navbar from '../layouts/navbar/Navbar'
import BottomNavbar from '../layouts/navbar/BottomNavbar'

const ProfileAcademy = () => {
    const {user,token,loading,message,error, role} = useSelector(state=>state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [state,setState] = useState()
    console.log(user,token,loading,message,error, role);
  
    async function fetchapi(){
        try{
  
          console.log(!!userApi.defaults.headers.common['Authorization']);
          console.log(!!localStorage.getItem('access'));
          const res = await  userApi.get('profile')
            console.log(res.data,'hai data'); 
            setState(res.data.data)
          
          // console.log(res.data);
        }catch(err){
          console.log(err,'errore profiule page');
          dispatch(logout())
          navigate('/academy/login')
        }
      }
  return (
    <>
    <Navbar academy={true} />
      thsi si academy profile  <br />
      <button onClick={fetchapi}> click </button> {state}
      <BottomNavbar academy={true} />
    </>
  )
}

export default ProfileAcademy
