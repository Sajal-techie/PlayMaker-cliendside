import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Home_Admin from '../../Components/admin/Home_Admin'
import ErrorPage404 from '../../Components/common/ErrorPage404'

const AdminPublicRoutes = ({component:Component,...rest}) => {
    const user = useSelector(state=>state.auth.user)
    const role = useSelector(state=>state.auth.role)
    const navigate = useNavigate()
    console.log(user, role);
    useEffect(()=>{
            if (user && role==='admin'){
                navigate(-1)
            }
    },[])
  return (
    !user && !role ?  <Component {...rest}/> : <ErrorPage404/>
  )
}

export default AdminPublicRoutes
