import React from 'react'
import userApi from '../../api/axiosconfig'
import { Navigate } from 'react-router-dom'
import Navbar from '../layouts/navbar/Navbar'
import BottomNavbar from '../layouts/navbar/BottomNavbar'
import MainSection from '../layouts/profile layouts/Main Section/MainSection'
import AboutSection from '../layouts/profile layouts/About Section/AboutSection'
import PostProfile from '../layouts/profile layouts/PostProfile'
import Achievementsection from '../layouts/profile layouts/Achievement Section/Achievementsection'
import TrialSection from './selection trials/Profile Trial Section/TrialSection'
import { useProfile } from '../common/Custom Hooks/useProfile'
import Skelton_profile from '../../Pages/Skelton_profile'

const ProfileAcademy = () => {
    const {data: academyData, isLoading,isError, error:fetchError} = useProfile()
    
      if (isLoading) return <><Skelton_profile/> </>
      if (isError) return <><Navigate to={'/academy/home'}/> </>

      console.log(academyData);
  return (
    <> 
    <Navbar academy={true} />
    <div className="h-full bg-gray-200 md:p-16 xl:px-40 sm:p-12"> 
      <MainSection  academy={true} 
                    id={academyData?.user?.id}
                    username={academyData?.user?.username} 
                    state={academyData?.profile?.state} 
                    district={academyData?.profile?.district} 
                    bio={academyData?.profile?.bio} 
                    profile_pic={academyData?.profile?.profile_photo}
                    cover_pic={academyData?.profile?.cover_photo}
                    userData={academyData}
                    /> 
        <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div className="flex flex-col w-full ">
            <AboutSection academy={true}
                          about={academyData?.profile?.about}
                          />
            <PostProfile academy={true}/>
            <TrialSection  academy={true}/>
            <Achievementsection  academy={true} dob={academyData?.user?.dob} />
          </div>
        </div> 
      </div>
      <BottomNavbar academy={true} />
    </>
  )
}

export default ProfileAcademy
