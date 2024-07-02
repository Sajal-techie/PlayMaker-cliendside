import React, { useEffect, useState } from 'react'
import userApi from '../../api/axiosconfig'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import AboutSection from '../layouts/profile layouts/About Section/AboutSection'
import MainSection from '../layouts/profile layouts/Main Section/MainSection'
import PostProfile from '../layouts/profile layouts/PostProfile'
import ExperienceSection from '../layouts/profile layouts/Experience Section/ExperienceSection'
import Achievementsection from '../layouts/profile layouts/Achievement Section/Achievementsection'
import Navbar from '../layouts/navbar/Navbar'
import BottomNavbar from '../layouts/navbar/BottomNavbar'
import { useProfile } from '../common/Custom Hooks/useProfile'
import Skelton_profile from '../../Pages/Skelton_profile'

const PlayerProfile = () => {
  const navigate = useNavigate()
  const {data: userData, isLoading,isError, error:fetchError} = useProfile()

  if (isLoading) return <><Skelton_profile/> </>
  if (isError) return <><Navigate to={'/home'}/> </>

    console.log(userData,isLoading,isError);
  return (
    <>
    <Navbar/>
    <div className="h-full bg-gray-200 md:p-16 xl:px-40 sm:p-12"> 
        {/* first section  */}
        <MainSection  id={userData?.user?.id}
                      username={userData?.user?.username}
                      phone={userData?.user?.phone}
                      bio={userData?.profile?.bio}
                      state={userData?.profile?.state}
                      district={userData?.profile?.district}
                      profile_pic={userData?.profile?.profile_photo}
                      cover_pic={userData?.profile?.cover_photo}
                      userData={userData}
                      />

        {/* first section end */}


        <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div className="flex flex-col w-full ">
                <AboutSection about={userData?.profile?.about} />
                <PostProfile data={userData?.profile?.about}  />
                <ExperienceSection   dob={userData?.user?.dob}/>
                <Achievementsection  dob={userData?.user?.dob}/>
            </div>
        </div>
    </div>
    <BottomNavbar/>
    </>
  )
}

export default PlayerProfile
