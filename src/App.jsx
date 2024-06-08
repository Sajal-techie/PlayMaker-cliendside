import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import PlayerRoutes from './Routes/PlayerRoutes';
import AcademyRoutes from './Routes/AcademyRoutes';
import ErrorPage404 from './Components/common/ErrorPage404';
import AdminRoutes from './Routes/AdminRoutes';

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


        <Route path='/unauthenticated' element={<ErrorPage404/>} /> 
      </Routes>
    </Router>
  )
}

export default App
