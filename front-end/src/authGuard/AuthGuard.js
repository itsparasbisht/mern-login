import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import userContext from '../context/userContext/UserContext'

function AuthGuard() {
    const [userState] = useContext(userContext)
    
    return userState.isAuthenticated ? <Outlet /> : <Navigate to="/log-in" />
}

export default AuthGuard