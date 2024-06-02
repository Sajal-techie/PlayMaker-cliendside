import React, { useEffect } from 'react'
import userApi from '../../api/axiosconfig'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slices/authSlice'

const Profile = () => {
  const {user,token,loading,message,error, role} = useSelector(state=>state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log(user,token,loading,message,error, role);
    useEffect (()=>{
        async function fetchapi(){
          try{

            console.log(!!userApi.defaults.headers.common['Authorization']);
            console.log(!!localStorage.getItem('playerToken'));
            const res = await  userApi.get('profile').then((hai)=>{
              console.log(hai.data,'hai data');
            })
            // console.log(res.data);
          }catch(err){
            console.log(err,'errore profiule page');
            dispatch(logout())
            navigate('/')
          }
        }
        fetchapi()
    },[])
  return (
    <div>
      this is profile pagre
    </div>
  )
}

export default Profile
