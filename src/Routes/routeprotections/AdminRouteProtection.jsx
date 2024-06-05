import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdminRouteProtection = ({component:Component,...rest}) => {
    const user = useSelector(state=>state.auth.user)
    const role = useSelector(state=>state.auth.role)
    console.log(user,role);

  return (
    user && role === 'admin' ? <Component {...rest}/> : <Navigate to={'/admin_login'}/>
  )
}

export default AdminRouteProtection
