import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'
import { Link, useNavigate } from 'react-router-dom'
const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = ()=>{
    dispatch(logout())
    navigate('/')
  }
  return (
    <>
    <div>
      welcome back to my youtube channel <br />
      <button onClick={handleLogout}>logout</button>
    </div>
 <br />
    <Link to={'/profile'}>profile </Link>
    </>
  )
}

export default Home
