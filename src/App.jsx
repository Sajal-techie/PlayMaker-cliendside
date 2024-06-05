import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import Login from './Components/player/Login'
import AcademyLogin from './Components/academy/AcademyLogin'
import Signup from './Components/player/Signup';
import Academy_signup from './Components/academy/Academy_signup';
import Home from './Components/player/Home';
import Profile from './Components/player/profile';
import PlayerRoutes from './Routes/PlayerRoutes';
import OTP_verification from './Components/common/OTP_verification';
import HomeAcademy from './Components/academy/HomeAcademy';
import ProfileAcademy from './Components/academy/ProfileAcademy';
import AcademyRoutes from './Routes/AcademyRoutes';
import PlayerRouteProtection from './Routes/routeprotections/PlayerRouteProtection';
import AcademyRouteProtection from './Routes/routeprotections/AcademyRouteProtection';
// import PublicRoutes from './Routes/routeprotections/PayerPublicRoutes';
import Admin_login from './Components/admin/Admin_Login';
import Home_Admin from './Components/admin/Home_Admin';
import AdminRouteProtection from './Routes/routeprotections/AdminRouteProtection';
import PlayerPublicRoutes from './Routes/routeprotections/PayerPublicRoutes';
import AcademyPublicRoute from './Routes/routeprotections/AcademyPublicRoute';
import AdminPublicRoutes from './Routes/routeprotections/AdminPublicRoutes';
import AcademyManage from './Components/admin/AcademyManage';
function App() {

  return (
    <>
    <Router>
      <Routes>
        {/* user routes */}
        <Route path="/" element={<PlayerPublicRoutes component={Login}/> } />
        <Route path="/signup" element={<PlayerPublicRoutes component={Signup}/> } />
        <Route path='/otp_verification' element={<PlayerPublicRoutes component={OTP_verification}/>} />
        <Route path='/home' element={<PlayerRouteProtection component={Home}/>}/>
        <Route path='/profile' element={<PlayerRouteProtection component={Profile} /> }/>
        {/* academy routes */}
        <Route path="/academy_login" element={<AcademyPublicRoute component={AcademyLogin} /> }  />
        <Route path="/academy_signup" element={<AcademyPublicRoute component={Academy_signup} /> } />
        <Route path="/academy_home" element={<AcademyRouteProtection component={HomeAcademy}/>} />
        <Route path="/academy_profile" element={<AcademyRouteProtection component={ProfileAcademy} />} />
        {/* admin routes */}
        <Route path="/admin_login" element={<AdminPublicRoutes component={Admin_login} />}/>
        <Route path="/admin_home" element={ <AdminRouteProtection component={Home_Admin}/>}/>
        <Route path="/admin_academyview" element={ <AdminRouteProtection component={AcademyManage}/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
