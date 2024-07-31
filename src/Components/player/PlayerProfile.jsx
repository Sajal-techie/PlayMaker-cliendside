import React, { useEffect, useState } from 'react'
import userApi from '../../api/axiosconfig'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import AboutSection from '../layouts/profile layouts/About Section/AboutSection'
import MainSection from '../layouts/profile layouts/Main Section/MainSection'
import PostProfile from '../layouts/profile layouts/Post Section/PostProfileSection'
import ExperienceSection from '../layouts/profile layouts/Experience Section/ExperienceSection'
import Achievementsection from '../layouts/profile layouts/Achievement Section/Achievementsection'
import Navbar from '../layouts/navbar/Navbar'
import BottomNavbar from '../layouts/navbar/BottomNavbar'
import { useProfile } from '../common/Custom Hooks/useProfile'
import Skelton_profile from '../../Pages/Skelton_profile'
import { updateProfilePhoto } from '../../redux/slices/authSlice'

const PlayerProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {userId} = useParams()
  const {data: userData, isLoading,isError, error:fetchError} = useProfile(userId)
  const {role,profile} = useSelector(state=>state.auth)

  useEffect(()=>{
    if(userData && userData.own_profile &&  userData.profile.profile_photo != profile){
      dispatch(updateProfilePhoto(userData.profile.profile_photo))
    }
  },[userData])

  if (isLoading) return <Skelton_profile/> 
  if (isError) return <Navigate to={'/home'}/>

    console.log(userData,isLoading,isError,userId,profile);

  return (
    <>
    <Navbar academy={role==='academy'}/>
    <div className="h-full bg-gray-200 md:p-16 xl:px-40 sm:p-12 pb-16"> 
        {/* first section  */}
        <MainSection  id={userData?.user?.id}
                      profile_pic={userData?.profile?.profile_photo}
                      cover_pic={userData?.profile?.cover_photo}
                      userData={userData}
                      ownProfile={userData?.own_profile}
                      />

        {/* first section end */}


        <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div className="flex flex-col w-full ">
                <AboutSection about={userData?.profile?.about} ownProfile={userData?.own_profile} />
                <PostProfile  ownProfile={userData?.own_profile} />
                <ExperienceSection   dob={userData?.user?.dob} ownProfile={userData?.own_profile} userAcademies={userData?.user_academies}/>
                <Achievementsection  dob={userData?.user?.dob} ownProfile={userData?.own_profile} achievements={userData?.achievements}/>
            </div>
        </div>
    </div>
    <BottomNavbar/>
    </>
  )
}

export default PlayerProfile
