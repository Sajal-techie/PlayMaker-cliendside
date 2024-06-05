import React, { Children, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ErrorPage404 from '../../Components/common/ErrorPage404'

const PlayerPublicRoutes = ({component:Component,...rest}) => {
    const user = useSelector(state=>state.auth.user)
    const role = useSelector(state=>state.auth.role)
    const navigate = useNavigate()
  console.log(user,role);
    useEffect(()=>{
            if ( user && role==='player' ){
                navigate(-1)
            }
    },[])
  return (
     !user && !role? <Component {...rest}/> : <ErrorPage404/>
  )
}

export default PlayerPublicRoutes

