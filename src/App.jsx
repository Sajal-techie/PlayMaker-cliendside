import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import PlayerRoutes from './Routes/PlayerRoutes';
import AcademyRoutes from './Routes/AcademyRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import Error401 from './Pages/Error401';
import Test from './Pages/Test';

function App() {
  return (
    <Router>
      <Routes> 
        {/* user routes */}
        <Route path='/*' element={<PlayerRoutes/>}/>
        {/* academy routes */}
        <Route path='/academy/*' element={<AcademyRoutes/>} />
        {/* admin routes */}
        <Route path='/admin/*' element={<AdminRoutes/>}/>


        <Route path='/unauthenticated' element={<Error401/>} /> 
        <Route path='/sample' element={<Test/>} />   
      </Routes>
    </Router>
  )
}

export default App
