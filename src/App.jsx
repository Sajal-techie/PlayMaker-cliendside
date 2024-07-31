import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import './App.css'
import PlayerRoutes from './Routes/PlayerRoutes';
import AcademyRoutes from './Routes/AcademyRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import Error401 from './Pages/Error401';
import Test from './Pages/Test';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { closeNotificationSocket, initializeNotificationSocket } from './Components/common/Notification/websocket';
import PushNotification from './Components/common/Notification/PushNotification';

function App() {
  const userId = useSelector(state=>state.auth.user_id)
  // useEffect (()=>{
  //   if (userId){
  //     initializeNotificationSocket(userId)
  //   }
  //   return ()=>{
  //     closeNotificationSocket()
  //   }
  // },[])
  return (
    <>
    <ToastContainer />
      <Router>
        <Routes> 
          {/* player routes */}
          <Route path='/*' element={<PlayerRoutes/>}/>
          {/* academy routes */}
          <Route path='/academy/*' element={<AcademyRoutes/>} />
          {/* admin routes */}
          <Route path='/admin/*' element={<AdminRoutes/>}/>


          <Route path='/unauthenticated' element={<Error401/>} /> 
          <Route path='/sample' element={<Test/>} />   
        </Routes>
      <PushNotification userId={userId} />
      </Router>
      
      

    </>
  )
}

export default App
