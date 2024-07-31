import React, { useEffect } from 'react'
import userApi from '../../api/axiosconfig'
import { Navigate, useParams } from 'react-router-dom'
import Navbar from '../layouts/navbar/Navbar'
import BottomNavbar from '../layouts/navbar/BottomNavbar'
import MainSection from '../layouts/profile layouts/Main Section/MainSection'
import AboutSection from '../layouts/profile layouts/About Section/AboutSection'
import PostProfile from '../layouts/profile layouts/Post Section/PostProfileSection'
import Achievementsection from '../layouts/profile layouts/Achievement Section/Achievementsection'
import TrialSection from './selection trials/Profile Trial Section/TrialSection'
import { useProfile } from '../common/Custom Hooks/useProfile'
import Skelton_profile from '../../Pages/Skelton_profile'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfilePhoto } from '../../redux/slices/authSlice'

const ProfileAcademy = () => {
    const {userId} = useParams()
    const dispatch = useDispatch()
    const {data: academyData, isLoading,isError, error:fetchError} = useProfile(userId)
    const {role, profile} = useSelector(state=>state.auth)

    useEffect(()=>{
      if (academyData && academyData.own_profile && academyData.profile.profile_photo != profile){
        dispatch(updateProfilePhoto(academyData.profile.profile_photo))
      }
    },[academyData])

      if (isLoading) return <><Skelton_profile/> </>
      if (isError) return <><Navigate to={'/academy/home'}/> </>

      console.log(academyData,userId);
  return (
    <> 
    <Navbar academy={role==='academy'} />
    <div className="h-full bg-gray-200 md:p-16 xl:px-40 sm:p-12 pb-16 "> 
      <MainSection  academy={true} 
                    id={academyData?.user?.id}
                    profile_pic={academyData?.profile?.profile_photo}
                    cover_pic={academyData?.profile?.cover_photo}
                    userData={academyData}
                    ownProfile={academyData.own_profile}
                    /> 
        <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div className="flex flex-col w-full ">
            <AboutSection academy={true}
                          about={academyData?.profile?.about}
                          ownProfile={academyData.own_profile}
                          />
            <PostProfile academy={true} ownProfile={academyData.own_profile}/>
            <TrialSection ownProfile={academyData.own_profile} id={userId}/>
            <Achievementsection 
                      academy={true}
                      achievements={academyData?.achievements} 
                      dob={academyData?.user?.dob}  
                      ownProfile={academyData.own_profile}/>
          </div>
        </div> 
      </div>
      <BottomNavbar academy={true} />
    </>
  )
}

export default ProfileAcademy
