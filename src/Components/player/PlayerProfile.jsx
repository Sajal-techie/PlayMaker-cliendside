import React, { useEffect, useState } from 'react'
import userApi from '../../api/axiosconfig'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AboutSection from '../layouts/profile layouts/About Section/AboutSection'
import MainSection from '../layouts/profile layouts/Main Section/MainSection'
import PostProfile from '../layouts/profile layouts/PostProfile'
import ExperienceSection from '../layouts/profile layouts/Experience Section/ExperienceSection'
import Achievementsection from '../layouts/profile layouts/Achievement Section/Achievementsection'
import Navbar from '../layouts/navbar/Navbar'
import BottomNavbar from '../layouts/navbar/BottomNavbar'
import { ToastContainer } from 'react-toastify'

const PlayerProfile = () => {
  const {user,token,loading,message,error, role} = useSelector(state=>state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userData,setUserData] = useState({})

    useEffect (()=>{
        fetchapi()
    },[])
    async function fetchapi(){
      try{
        const res = await userApi.get('profile')
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
    <>
    <Navbar/>
    <div className="h-full bg-gray-200 md:p-16 xl:px-40 sm:p-12"> 
        {/* first section  */}
        <MainSection  id={userData?.user?.id}
                      username={userData?.user?.username}
                      bio={userData?.profile?.bio}
                      state={userData?.profile?.state}
                      district={userData?.profile?.district}
                      profile_pic={userData?.profile?.profile_photo}
                      cover_pic={userData?.profile?.cover_photo}
                      fetchapi={fetchapi}  
                      />

        {/* first section end */}
        <ToastContainer />


        <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div className="flex flex-col w-full ">
                <AboutSection about={userData?.profile?.about}
                              fetchapi={fetchapi}
                              />
                <PostProfile data={userData?.profile?.about}  />
                <ExperienceSection dob={userData?.user?.dob}  />
                <Achievementsection />
            </div>
        </div>
    </div>
    <BottomNavbar/>
    </>
  )
}

export default PlayerProfile
