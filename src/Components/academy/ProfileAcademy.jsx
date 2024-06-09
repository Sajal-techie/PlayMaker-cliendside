import React, { useEffect, useState } from 'react'
import userApi from '../../api/axiosconfig'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slices/authSlice'
import Navbar from '../layouts/navbar/Navbar'
import BottomNavbar from '../layouts/navbar/BottomNavbar'
import MainSection from '../layouts/profile layouts/MainSection'
import AboutSection from '../layouts/profile layouts/AboutSection'
import PostProfile from '../layouts/profile layouts/PostProfile'
import Achievementsection from '../layouts/profile layouts/Achievementsection'
import TrialSection from '../layouts/profile layouts/TrialSection'

const ProfileAcademy = () => {
    const {user,token,loading,message,error, role} = useSelector(state=>state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [academyData,setAcademyData] = useState({})
    console.log(user,token,loading,message,error, role);
  
    async function fetchapi(){
        try{
  
          console.log(!!userApi.defaults.headers.common['Authorization']);
          console.log(!!localStorage.getItem('access'));
          const res = await  userApi.get('profile')
            console.log(res.data,'hai data'); 
            setAcademyData(res.data.user_details)
          // console.log(res.data);
        }catch(err){
          console.log(err,'errore profiule page');
          // dispatch(logout())
          // navigate('/academy/login')
        }
      }
      useEffect (()=>{
          fetchapi()
      },[])

      console.log(academyData);
  return (
    <> 
    <Navbar academy={true} />
    <div className="h-full bg-gray-200 md:p-16 xl:px-40 sm:p-12"> 
      <MainSection academy={true} username={academyData?.user?.username} state={academyData?.profile?.state} district={academyData?.profile?.district} bio={academyData?.profile?.bio} /> 
        <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div className="flex flex-col w-full ">
            <AboutSection academy={true}/>
            <PostProfile academy={true}/>
            <TrialSection  academy={true}/>
            <Achievementsection  academy={true}/>
          </div>
        </div> 
      </div>
      <BottomNavbar academy={true} />
    </>
  )
}

export default ProfileAcademy
