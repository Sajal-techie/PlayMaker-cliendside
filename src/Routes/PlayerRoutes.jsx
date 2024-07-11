import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { InfinitySpin } from 'react-loader-spinner';
import RedirectIfAuthenticated from './protected/RedirectIfAuthenticated';
import ProtectedRoute from './protected/ProtectedRoute';
import Skelton_profile from '../Pages/Skelton_profile';
import ViewTrialdetails from '../Components/player/selection trial/ViewTrialdetails';
import RegisterTrial from '../Components/player/selection trial/RegisiterTrial';


const Home = lazy(()=> import ('../Components/player/Home') )
const Login = lazy(()=> import ('../Components/player/Login'))
const Signup = lazy(()=> import('../Components/player/Signup/Signup'))
const  OTP_verification = lazy(()=> import ('../Components/common/OTP_verification')) 
const  ErrorPage404 = lazy(()=> import('../Components/common/ErrorPage404'))
const  PlayerProfile = lazy(()=> import('../Components/player/PlayerProfile'))
const  ViewExperience = lazy(()=> import('../Components/layouts/profile layouts/Experience Section/ViewExperience'))
const  ViewAchievement = lazy(()=> import('../Components/layouts/profile layouts/Achievement Section/ViewAchievement'))
const   ForgetPassword= lazy(()=> import('../Components/common/ForgetPassword'))
const  ResetPassword = lazy(()=> import('../Components/common/ResetPassword'))
const  GetUserDetails = lazy(()=> import('../Components/player/Signup/GetUserDetails'))
const ListTrials = lazy(()=>import('../Components/player/selection trial/ListTrials'))

const PlayerRoutes = () => {
    
  return (  
      <Suspense fallback={<Skelton_profile/>}>
        <Routes>
              <Route path="/" element={<RedirectIfAuthenticated element={<Login/>} redirectTo={'/home'} />   }/>
              <Route path="/signup" element={<RedirectIfAuthenticated element={<Signup/>} redirectTo={'/home'} />  }/>
              <Route path='/otp_verification' element={<RedirectIfAuthenticated element={<OTP_verification/>} redirectTo={'/home'} />  } />
              <Route path='/forget_password' element={<RedirectIfAuthenticated element={<ForgetPassword/>} redirectTo={'/home'} />  } />
              <Route path='/reset_password' element={<RedirectIfAuthenticated element={<ResetPassword/>} redirectTo={'/home'} />  } />
              
              <Route path='/home' element={<ProtectedRoute element={<Home/>} role={"player"} />}/>
              <Route path='/welcome' element={<ProtectedRoute element={<GetUserDetails/>} role={"player"} />}/>
              <Route path='/profile' element={<ProtectedRoute element={<PlayerProfile/>} role={"player"} /> }/>
              <Route path='/view_experience' element={<ProtectedRoute element={<ViewExperience/>} role={"player"} /> }/>
              <Route path='/view_achievements' element={<ProtectedRoute element={<ViewAchievement/>} role={"both"} /> }/>
              <Route path='/list_trials' element={<ProtectedRoute element={<ListTrials/>} role={"player"} /> }/>
              <Route path='/trial_details/:id' element={<ProtectedRoute element={<ViewTrialdetails/>} role={"player"} /> }/>
              <Route path='/register_trial/:id' element={<ProtectedRoute element={<RegisterTrial/>} role={"player"} /> }/>
              <Route path='*' element={<ErrorPage404/>}/>
        </Routes>
      </Suspense>
  )
}

export default PlayerRoutes
