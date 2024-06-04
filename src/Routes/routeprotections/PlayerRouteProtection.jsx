import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PlayerRouteProtection = ({component:Component,...rest}) => {
  const user = useSelector(state=>state.auth.user)
  const role = useSelector(state=>state.auth.role)
  console.log(user,role);
return (  
  user && role === 'player' ? (<Component {...rest}/> ): <Navigate to={'/'}/>
)
}


export default PlayerRouteProtection
