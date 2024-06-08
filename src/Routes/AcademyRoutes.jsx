import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RedirectIfAuthenticated from './protected/RedirectIfAuthenticated'
import AcademyLogin from '../Components/academy/AcademyLogin'
import Academy_signup from '../Components/academy/Academy_signup'
import HomeAcademy from '../Components/academy/HomeAcademy'
import ProfileAcademy from '../Components/academy/ProfileAcademy'
import ProtectedRoute from './protected/ProtectedRoute'


const AcademyRoutes = () => {

  return (
    <Routes>
        <Route path="/login" element={<RedirectIfAuthenticated element={<AcademyLogin/>} redirectTo={'/academy/home'} /> }  />
        <Route path="/signup" element={<RedirectIfAuthenticated element={<Academy_signup/>} redirectTo={'/academy/home'} /> } />
        <Route path="/home" element={<ProtectedRoute element={<HomeAcademy/>} role={"academy"} />} />
        <Route path="/profile" element={<ProtectedRoute element={<ProfileAcademy/>} role={"academy"} />} />
    </Routes>
  )
}
export default AcademyRoutes
