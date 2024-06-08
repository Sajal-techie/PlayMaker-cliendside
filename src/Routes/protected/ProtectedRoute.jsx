import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({element, role}) => {
    const currentRole = useSelector(state=>state.auth.role)
    const location = useLocation()
    console.log(location,'location in protected');
    if (!currentRole || currentRole!== role) {
        return <Navigate to="/unauthenticated" replace />;
      }
      return element;
}

export default ProtectedRoute
