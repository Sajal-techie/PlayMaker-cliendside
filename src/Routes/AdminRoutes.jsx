import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import RedirectIfAuthenticated from './protected/RedirectIfAuthenticated'
import ProtectedRoute from './protected/ProtectedRoute'
import Skelton1 from '../Pages/Skelton1'

const AcademyManage  = lazy(()=> import('../Components/admin/Academy management/AcademyManage'))
const  Home_Admin = lazy(()=> import('../Components/admin/Home_Admin'))
const  AdminLogin = lazy(()=> import('../Components/admin/AdminLogin'))
const  PlayerManage = lazy(()=> import('../Components/admin/PlayerManagement.jsx/PlayerManage'))
const TrialManage = lazy(()=>import ('../Components/admin/Trial Management/TrialManage'))
const Accounts = lazy(()=>import('../Components/admin/Accounts/Accounts'))
const ErrorPage404 = lazy(()=>import('../Components/common/ErrorPage404'))

const AdminRoutes = () => {
  return (
    <Suspense fallback={<Skelton1/>}>
      <Routes>
          <Route path="/login" element={<RedirectIfAuthenticated element={<AdminLogin/>} redirectTo={'/admin/home'} />}/>
          <Route path="/home" element={<ProtectedRoute element={<Home_Admin/>} role={"admin"} />}/>
          <Route path="/academyview" element={<ProtectedRoute element={<AcademyManage/>} role={"admin"} />}/>
          <Route path="/playerview" element={<ProtectedRoute element={<PlayerManage/>} role={"admin"} />}/>
          <Route path="/trialview" element={<ProtectedRoute element={<TrialManage/>} role={"admin"} />}/>
          <Route path="/accounts" element={<ProtectedRoute element={<Accounts/>} role={"admin"} />}/>
          <Route path='*' element={<ErrorPage404/>}/>
      </Routes>
    </Suspense>
  )
}

export default AdminRoutes
