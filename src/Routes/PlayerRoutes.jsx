import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Components/player/Home'
import Login from '../Components/player/Login'
import Signup from '../Components/player/Signup/Signup'
import OTP_verification from '../Components/common/OTP_verification'
import RedirectIfAuthenticated from './protected/RedirectIfAuthenticated'
import ProtectedRoute from './protected/ProtectedRoute'
import ErrorPage404 from '../Components/common/ErrorPage404'
import PlayerProfile from '../Components/player/PlayerProfile'
import ViewExperience from '../Components/layouts/profile layouts/Experience Section/ViewExperience'
import ViewAchievement from '../Components/layouts/profile layouts/Achievement Section/ViewAchievement'
import ForgetPassword from '../Components/common/ForgetPassword'
import ResetPassword from '../Components/common/ResetPassword'
import GetUserDetails from '../Components/player/Signup/GetUserDetails'



const PlayerRoutes = () => {
    
  return (  
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
        <Route path='*' element={<ErrorPage404/>}/>

    </Routes>
  )
}

export default PlayerRoutes
