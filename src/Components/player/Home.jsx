import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import userApi from '../../api/axiosconfig'
import Navbar from '../layouts/navbar/Navbar'
import BottomNavbar from '../layouts/navbar/BottomNavbar'
const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async ()=>{
    try{

      const res = await dispatch(logout()).unwrap()
      console.log(res,'in home');
      navigate('/')
    }catch(error){
      console.log(error,'error in home');
    }
  }
  return (
     < >
    <Navbar />
    <div>
      welcome back to home <br />
      <button onClick={handleLogout}>logout</button>
    </div>
 <br />
    <Link to={'/profile'}>profile </Link>
    <BottomNavbar/>
    </>
  )
}

export default Home
