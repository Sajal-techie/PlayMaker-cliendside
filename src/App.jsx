import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import Login from './Components/player/Login'
import AcademyLogin from './Components/academy/AcademyLogin'
import Signup from './Components/player/Signup';
import Academy_signup from './Components/academy/Academy_signup';
import OTP_verification from './Components/player/OTP_verification';
import Home from './Components/player/Home';
import Profile from './Components/player/profile';
import PlayerRoutes from './Routes/PlayerRoutes';
function App() {

  return (
    <>
    <Router>
      <Routes>
        {/* user routes */}
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path='/otp_verification' element={<OTP_verification/>} />
        <Route path='/home' element={<PlayerRoutes component={Home}/>}/>
        <Route path='/profile' element={<PlayerRoutes component={Profile} /> }/>
        {/* academy routes */}
        <Route path="/academy_login" element={<AcademyLogin/>} />
        <Route path="/academy_signup" element={<Academy_signup/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
