import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import HomeAcademy from '../../Components/academy/HomeAcademy'
import ErrorPage404 from '../../Components/common/ErrorPage404'

const AcademyPublicRoute = ({component:Component,...rest}) => {
    const user = useSelector(state=>state.auth.user)
    const role = useSelector(state=>state.auth.role)
    const navigate = useNavigate()
    console.log(user,role);
    useEffect(()=>{
        if (user && role==='academy'){
            navigate(-1)
        }
    },[])
  return (
    !user && !role ?  <Component {...rest}/> : <ErrorPage404/>
  )
}

export default AcademyPublicRoute
