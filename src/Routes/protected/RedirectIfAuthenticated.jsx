import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom'

const RedirectIfAuthenticated = ({element, redirectTo}) => {
    const location = useLocation();
    console.log(location,'location');
    const role = useSelector(state=>state.auth.role)
    
    if (role) {
        return <Navigate to={redirectTo} replace />;
    }

    return element;
}

export default RedirectIfAuthenticated
