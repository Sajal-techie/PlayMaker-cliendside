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
import PublicRoutes from './Routes/routeprotections/PublicRoutes';
import Admin_login from './Components/admin/Admin_Login';
import Home_Admin from './Components/admin/Home_Admin';
function App() {

  return (
    <>
    <Router>
      <Routes>
        {/* user routes */}
        <Route path="/" element={<PublicRoutes component={Login}/> } />
        <Route path="/signup" element={<PublicRoutes component={Signup}/> } />
        <Route path='/otp_verification' element={<PublicRoutes> <OTP_verification/></PublicRoutes>} />
        <Route path='/home' element={<PlayerRouteProtection component={Home}/>}/>
        <Route path='/profile' element={<PlayerRouteProtection component={Profile} /> }/>
        {/* academy routes */}
        <Route path="/academy_login" element={<PublicRoutes component={AcademyLogin} /> }  />
        <Route path="/academy_signup" element={<PublicRoutes component={Academy_signup} /> } />
        <Route path="/academy_home" element={<AcademyRouteProtection component={HomeAcademy}/>} />
        <Route path="/academy_profile" element={<AcademyRouteProtection component={ProfileAcademy} />} />
        {/* admin routes */}
        <Route path="/admin_login" element={<Admin_login/>}/>
        <Route path="/admin_home" element={<Home_Admin/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
