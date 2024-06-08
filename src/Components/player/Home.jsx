import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import userApi from '../../api/axiosconfig'
const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = ()=>{
    try{

      const res = dispatch(logout()).unwrap()
      console.log(res,'in home');
      navigate('/')
    }catch(error){
      console.log(error,'error in home');
    }
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
