import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AcademyRouteProtection = ({component:Component,...rest}) => {
    const user = useSelector(state=>state.auth.user)
    const role = useSelector(state=>state.auth.role)
    console.log(user, role);
  return (
    user && role ==='academy' ? <Component {...rest}/> : <Navigate to={'/academy_login'}/>
  )
}

export default AcademyRouteProtection
