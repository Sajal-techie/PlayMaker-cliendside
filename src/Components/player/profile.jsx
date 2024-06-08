import React, { useEffect, useState } from 'react'
import userApi from '../../api/axiosconfig'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slices/authSlice'
import AboutSection from '../common/profile sections/AboutSection'
import ProfileSection from '../common/profile sections/MainSection'
import PostProfile from '../common/profile sections/PostProfile'
import ExperienceSection from '../common/profile sections/ExperienceSection'
import Achievementsection from '../common/profile sections/Achievementsection'

const Profile = () => {
  const {user,token,loading,message,error, role} = useSelector(state=>state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userData,setUserData] = useState({})
  console.log(user,token,loading,message,error, role);

    useEffect (()=>{
        fetchapi()
    },[])
    async function fetchapi(){
      try{
        console.log(!!userApi.defaults.headers.common['Authorization']);
        console.log(!!localStorage.getItem('access'));
        const res = await  userApi.get('profile')
          console.log(res.data,'hai data'); 
          setUserData(res.data.user_details)
        
      }catch(err){
        console.log(err,'errore profiule page');
        // dispatch(logout())
        // navigate('/')
      }
    }
    console.log(userData);
  return (
    <div className="h-full bg-gray-200 md:p-28 xl:px-40 sm:p-12"> 
        {/* first section  */}
        <ProfileSection username={userData?.user?.username} bio={userData?.profile?.bio} state={userData?.profile?.state} district={userData?.profile?.district}  />
        {/* first section end */}


        <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div className="flex flex-col w-full 2xl:w-2/3">
                <AboutSection data={userData?.profile?.about} />
                <PostProfile data={userData?.profile?.about}  />
                <ExperienceSection data={userData?.profile?.about} />
                <Achievementsection data={userData?.profile?.about} />
            </div>
        </div>
    
    </div>
  
  )
}

export default Profile
