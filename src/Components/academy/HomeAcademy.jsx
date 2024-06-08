import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slices/authSlice'

const HomeAcademy = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handlelogout = ()=>{
        dispatch(logout())
        navigate('/academy/login')
    }
  return (
    <div>
      academy home <br />
      <br />
      <Link to={'/academy/profile'} >profile</Link> 
      <br />
      <button onClick={handlelogout} >logout</button> <br />
      
    </div>
  )
}

export default HomeAcademy
