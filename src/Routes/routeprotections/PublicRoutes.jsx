import React, { Children, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

const PublicRoutes = ({component:Component,...rest}) => {
    const user = useSelector(state=>state.auth.user)
    const role = useSelector(state=>state.auth.role)
    // const navigate = useNavigate()

    // useEffect(()=>{
    //         if ( user && role ){
    //             navigate(-1)
    //         }
    // },[])
  return (
     !user && !role? <Component {...rest}/> : <Navigate to={'/'}/>
  )
}

export default PublicRoutes
