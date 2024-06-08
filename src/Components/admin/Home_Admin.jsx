import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slices/authSlice'

const Home_Admin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async ()=>{
        try{
        const response = await dispatch(logout()).unwrap()
        console.log(response,'admin logout');
        navigate('/admin/login')
      }catch(error){
        console.log(error);
      }
    }
  return (
    <div> 
      <Link to={'/admin/academyview'} > view academies </Link> <br /><br />
      home admin <br /> <br />
      <button onClick={handleLogout}  >logout</button>
    </div>
  )
}

export default Home_Admin
