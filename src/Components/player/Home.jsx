import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../layouts/navbar/Navbar'
import BottomNavbar from '../layouts/navbar/BottomNavbar'
import userApi from '../../api/axiosconfig'

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

  // useEffect(()=>{
  //   fetchHome()
  // },[])
  // const fetchHome = async()=>{
  //   try{
  //     const res = await userApi.get('home')
  //     console.log(res,'response in home');
  //   }catch(error){
  //     console.log(error,'error in home');
  //   }
  // }
  return (
     < >
    <Navbar />
    <div>
      welcome back to home <br />
      <button onClick={handleLogout}>logout</button>
    </div>
    <br />
    <Link to={'/profile'}>profile </Link>
    
      {/* <div class="min-h-screen bg-[#0a1120] py-6 flex flex-col justify-center relative overflow-hidden sm:py-12">
        <div class="absolute inset-0 bg-[url(https://snippets.alexandru.so/beams.png)] bg-cover bg-center bg-fixed"></div>
        <div class="absolute inset-0 bg-[url(https://snippets.alexandru.so/grid.svg)] bg-fixed"></div>

        <div class="bg-gray-800/40 backdrop-blur ring-1 ring-inset ring-gray-500/20 h-28 w-64 mx-auto rounded-lg flex cursor-context-menu">
          <div class="m-auto text-gray-200">
            <div class="animate-text-shimmer bg-clip-text text-transparent bg-[linear-gradient(110deg,#e2e8f0,45%,#1e293b,55%,#e2e8f0)] bg-[length:250%_100%]">Text Shimmer Effect</div>
          </div>
        </div>
      </div> */}
    <BottomNavbar/>
    </>
  )
}

export default Home
