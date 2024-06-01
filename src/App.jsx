import './App.css'
import Login from './Components/player/Login'
import AcademyLogin from './Components/academy/AcademyLogin'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Components/player/Signup';
import { useEffect } from 'react';
import axios from 'axios';
import Academy_signup from './Components/academy/Academy_signup';
import OTP_verification from './Components/player/OTP_verification';
import Home from './Components/player/Home';

function App() {

  return (
    <>
    <Router>
      <Routes>
        {/* user routes */}
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path='/otp_verification' element={<OTP_verification/>} />
        <Route path='/home' element={<Home/>}/>
        {/* academy routes */}
        <Route path="/academy_login" element={<AcademyLogin/>} />
        <Route path="/academy_signup" element={<Academy_signup/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
