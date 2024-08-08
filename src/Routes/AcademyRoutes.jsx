import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import RedirectIfAuthenticated from './protected/RedirectIfAuthenticated'
import ProtectedRoute from './protected/ProtectedRoute'
import Skelton_profile from '../Pages/Skelton_profile'


const  AcademyLogin = lazy(()=> import('../Components/academy/AcademyLogin'))
const  Academy_signup = lazy(()=> import('../Components/academy/Academy_signup'))
// const  HomeAcademy = lazy(()=> import('../Components/academy/HomeAcademy'))
const  ProfileAcademy = lazy(()=> import('../Components/academy/ProfileAcademy'))
const AddTrial = lazy(()=> import('../Components/academy/selection trials/AddTrial'))
const ListOwnTrial = lazy(()=>import('../Components/academy/selection trials/ListOwnTrials/ListOwnTrial'))
const TrialDetails = lazy(()=>import ('../Components/academy/selection trials/ListOwnTrials/TrialDetails'))
const AcademyDashboard = lazy(()=>import('../Components/academy/DashBoard/AcademyDashboard'))
const ErrorPage404 = lazy(()=>import('../Components/common/ErrorPage404'))


const AcademyRoutes = () => {

  return (
    <Suspense fallback={<Skelton_profile/>}>
      <Routes>
          <Route path="/login" element={<RedirectIfAuthenticated element={<AcademyLogin/>} redirectTo={'/academy/home'} /> }  />
          <Route path="/signup" element={<RedirectIfAuthenticated element={<Academy_signup/>} redirectTo={'/academy/home'} /> } />
          <Route path="/home" element={<ProtectedRoute element={<AcademyDashboard/>} role={"academy"} />} />
          <Route path="/profile/:userId?" element={<ProtectedRoute element={<ProfileAcademy/>} role={"both"} />} />
          <Route path="/add_trial" element={<ProtectedRoute element={<AddTrial/>} role={"academy"} />} />
          <Route path="/list_trials" element={<ProtectedRoute element={<ListOwnTrial/>} role={"academy"} />} />
          <Route path="/trial_details/:id" element={<ProtectedRoute element={<TrialDetails/>} role={"academy"} />} />
          <Route path='*' element={<ErrorPage404/>}/>
      </Routes>
    </Suspense>
  )
}
export default AcademyRoutes
