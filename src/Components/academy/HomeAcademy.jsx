import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slices/authSlice'
import Navbar from '../layouts/navbar/Navbar'
import BottomNavbar from '../layouts/navbar/BottomNavbar'

const HomeAcademy = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handlelogout = async ()=>{
        const res = await dispatch(logout()).unwrap()
        console.log(res,'in acdemy home before redirecting to login');
        navigate('/academy/login')
    }
  return (
    <>
    <Navbar academy={true} />
      academy home <br />
      <br />
      <Link to={'/academy/profile'} >profile</Link> 
      <br />
      <button onClick={handlelogout} >logout</button> <br />
      <BottomNavbar academy={true} />
    </>
  )
}

export default HomeAcademy
