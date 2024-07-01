import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import RedirectIfAuthenticated from './protected/RedirectIfAuthenticated'
import ProtectedRoute from './protected/ProtectedRoute'
import Skelton1 from '../Pages/Skelton1'


const  AcademyLogin = lazy(()=> import('../Components/academy/AcademyLogin'))
const  Academy_signup = lazy(()=> import('../Components/academy/Academy_signup'))
const  HomeAcademy = lazy(()=> import('../Components/academy/HomeAcademy'))
const  ProfileAcademy = lazy(()=> import('../Components/academy/ProfileAcademy'))


const AcademyRoutes = () => {

  return (
    <Suspense fallback={<Skelton1/>}>
      <Routes>
          <Route path="/login" element={<RedirectIfAuthenticated element={<AcademyLogin/>} redirectTo={'/academy/home'} /> }  />
          <Route path="/signup" element={<RedirectIfAuthenticated element={<Academy_signup/>} redirectTo={'/academy/home'} /> } />
          <Route path="/home" element={<ProtectedRoute element={<HomeAcademy/>} role={"academy"} />} />
          <Route path="/profile" element={<ProtectedRoute element={<ProfileAcademy/>} role={"academy"} />} />
      </Routes>
    </Suspense>
  )
}
export default AcademyRoutes
