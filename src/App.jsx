import './App.css'
import Login from './Components/player/Login'
import AcademyLogin from './Components/academy/AcademyLogin'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/academy_login" element={<AcademyLogin/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
