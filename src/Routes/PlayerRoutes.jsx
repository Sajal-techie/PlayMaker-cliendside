import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Components/player/Home'
import Login from '../Components/player/Login'
import Signup from '../Components/player/Signup'
import OTP_verification from '../Components/common/OTP_verification'
import RedirectIfAuthenticated from './protected/RedirectIfAuthenticated'
import ProtectedRoute from './protected/ProtectedRoute'
import ErrorPage404 from '../Components/common/ErrorPage404'
import PlayerProfile from '../Components/player/PlayerProfile'



const PlayerRoutes = () => {
    
  return (  
    <Routes>
      <Route path="/" element={<RedirectIfAuthenticated element={<Login/>} redirectTo={'/home'} />   }/>
        <Route path="/signup" element={<RedirectIfAuthenticated element={<Signup/>} redirectTo={'/home'} />  }/>
        <Route path='/otp_verification' element={<RedirectIfAuthenticated element={<OTP_verification/>} redirectTo={'/home'} />  } />
        <Route path='/home' element={<ProtectedRoute element={<Home/>} role={"player"} />}/>
        <Route path='/profile' element={<ProtectedRoute element={<PlayerProfile/>} role={"player"} /> }/>
        <Route path='*' element={<ErrorPage404/>}/>

    </Routes>
  )
}

export default PlayerRoutes
