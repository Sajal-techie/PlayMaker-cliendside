import React, { useEffect, useState } from 'react'
import userApi from '../../api/axiosconfig'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slices/authSlice'

const Profile = () => {
  const {user,token,loading,message,error, role} = useSelector(state=>state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [state,setState] = useState()
  console.log(user,token,loading,message,error, role);

    async function fetchapi(){
      try{

        console.log(!!userApi.defaults.headers.common['Authorization']);
        console.log(!!localStorage.getItem('access'));
        const res = await  userApi.get('profile')
          console.log(res.data,'hai data'); 
          setState(res.data.data)
        
        // console.log(res.data);
      }catch(err){
        console.log(err,'errore profiule page');
        dispatch(logout())
        navigate('/')
      }
    }
  return (
    <div>
      <button onClick={fetchapi}>click </button> <br />
      this is profile pagre {state} 
      
    </div>
  )
}

export default Profile
